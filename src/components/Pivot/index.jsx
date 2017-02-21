import React, {PureComponent} from 'react';

import DataFrame from 'dataframe';
import Emitter from 'wildemitter';
import InlineWorker from 'inline-worker';
import {Tag} from 'antd';
import {autobind} from 'core-decorators';

const _ = {
    filter: require('lodash/filter'),
    map: require('lodash/map'),
    find: require('lodash/find'),
    sortBy: require('lodash/sortBy')
};
const partial = require('./lib/partial');
const download = require('./lib/download');
const getValue = require('./lib/getValue');
const PivotTable = require('./lib/components/PivotTable.jsx');
const ColumnControl = require('./lib/components/ColumnControl.jsx');

function loadStyles() { require('./style.css'); }

export default class ReactPivot extends PureComponent {
    static defaultProps = {
        rows: [],
        columns: [],
        dimensions: [],
        activeDimensions: [],
        tableClassName: '',
        csvDownloadFileName: 'data.csv',
        csvTemplateFormat: false,
        defaultStyles: true,
        nPaginateRows: 25,
        solo: null,
        hiddenColumns: [],
        sortBy: null,
        sortDir: 'asc',
        eventBus: new Emitter(),
        compact: false,
        excludeSummaryFromExport: false,
        reduce: () => {},
        onData: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            dimensions: _.filter(this.props.activeDimensions, (title) => {
                return title;
            }),
            calculations: {},
            sortBy: this.props.sortBy,
            sortDir: this.props.sortDir,
            hiddenColumns: this.props.hiddenColumns,
            solo: this.props.solo,
            rows: this.props.rows
        };
    }

    componentWillMount() {
        if (this.props.defaultStyles) loadStyles();

        this.updateRows();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.hiddenColumns !== this.props.hiddenColumns) this.setHiddenColumns(newProps.hiddenColumns);
        if (newProps.rows !== this.props.rows) {
            this.updateRows();
        }
    }

    @autobind
    getColumns() {
        const keys = Object.getOwnPropertyNames(this.props.columns);
        const columns = [];

        for (const column of keys) {
            if (this.state.hiddenColumns.indexOf(column) === -1) {
                columns.push({
                    title: column,
                    value: column
                });
            }
        }

        return columns;
    }

    @autobind
    setDimensions(updatedDimensions) {
        this.props.eventBus.emit('activeDimensions', updatedDimensions);
        this.setState({ dimensions: updatedDimensions });

        setTimeout(this.updateRows, 0);
    }

    @autobind
    setHiddenColumns(hidden) {
        this.props.eventBus.emit('hiddenColumns', hidden);
        this.setState({ hiddenColumns: hidden });

        setTimeout(this.updateRows, 0);
    }

    @autobind
    setSort(cTitle) {
        let sortBy = this.state.sortBy;
        let sortDir = this.state.sortDir;

        if (sortBy === cTitle) sortDir = (sortDir === 'asc') ? 'desc' : 'asc';
        else {
            sortBy = cTitle;
            sortDir = 'asc';
        }

        this.props.eventBus.emit('sortBy', sortBy);
        this.props.eventBus.emit('sortDir', sortDir);

        this.setState({ sortBy, sortDir });

        setTimeout(this.updateRows, 0);
    }

    @autobind
    setSolo(solo) {
        this.props.eventBus.emit('solo', solo);
        this.setState({ solo: solo });

        setTimeout(this.updateRows, 0);
    }

    @autobind
    isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    @autobind
    updateRows() {
        const columns = this.getColumns();
        const sortByTitle = this.state.sortBy;
        const sortCol = _.find(columns, (col) => {
            return col.title === sortByTitle;
        }) || {};
        const sortBy = sortCol.value;
        const sortDir = this.state.sortDir;
        const self = {};

        this.sort(sortBy, sortDir);
    }

    @autobind
    clearSolo() {
        this.props.eventBus.emit('solo', null);
        this.setState({ solo: null });

        setTimeout(this.updateRows, 0);
    }

    @autobind
    hideColumn(column) {
        const hidden = this.state.hiddenColumns.concat([column]);

        this.setHiddenColumns(hidden);

        setTimeout(this.updateRows, 0);
    }

    @autobind
    downloadCSV(rows) {
        const self = this;
        const columns = this.getColumns();

        let csv = _.map(columns, 'title').map(JSON.stringify.bind(JSON)).join(',') + '\n';

        const maxLevel = this.state.dimensions.length - 1;
        const excludeSummary = this.props.excludeSummaryFromExport;

        rows.forEach((row) => {
            let val;

            if (excludeSummary && (row._level < maxLevel)) return;

            const vals = columns.map((col) => {
                if (col.type === 'dimension') {
                    val = row[col.title];
                } else {
                    val = getValue(col, row);
                }

                if (col.template && self.props.csvTemplateFormat) {
                    val = col.template(val);
                }

                return JSON.stringify(val);
            });

            csv += vals.join(',') + '\n';
        });

        download(csv, this.props.csvDownloadFileName, 'text/csv');
    }

    @autobind
    sort(sortBy, sortDir) {
        const sortWorker = new InlineWorker((self) => {
            self.onmessage = (e) => {
                postMessage(self.sort(e.data.rows, e.data.sortBy, e.data.sortDir));
            };

            self.sort = (array, field, direction) => {
                const copy = array.slice(0);
                const collator = new Intl.Collator(undefined, {
                    numeric: true,
                    sensitivity: 'base',
                    ignorePunctuation: true
                });
                let param;

                if (!field) return copy;
                else if (self.isNumber(field)) param = +field;
                else param = field.trim();

                const sorted = copy.sort((a, b) => {
                    return collator.compare(a[param], b[param]);
                });

                return (direction === 'desc') ? sorted.reverse() : sorted;
            };

            self.isNumber = (value) => {
                return !isNaN(parseFloat(value)) && isFinite(value);
            };
        }, self);

        sortWorker.onmessage = (e) => {
            const rows = e.data;

            this.setState({rows});
            this.props.onData(rows);
        };

        sortWorker.postMessage({
            rows: this.props.rows,
            sortBy,
            sortDir
        });
    }

    render() {
        const html = (
            <div className="reactPivot">
                <ColumnControl
                  hiddenColumns={this.state.hiddenColumns}
                  onChange={this.setHiddenColumns} />

                {
                /*
                <div className="reactPivot-csvExport">
                    <button onClick={partial(this.downloadCSV, this.state.rows)}>
                        Export CSV
                    </button>
                </div>
                */
                }

                <PivotTable
                  columns={this.getColumns()}
                  rows={this.state.rows}
                  sortBy={this.state.sortBy}
                  sortDir={this.state.sortDir}
                  onSort={this.setSort}
                  onColumnHide={this.hideColumn}
                  nPaginateRows={this.props.nPaginateRows}
                  onSolo={this.setSolo} />
            </div>
        );

        return html;
    }
}
