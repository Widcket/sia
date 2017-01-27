import React, {Component} from 'react';

import DataFrame from 'dataframe';
import Emitter from 'wildemitter';
import {Tag} from 'antd';
import {autobind} from 'core-decorators';
import uwork from 'uwork';

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

export default class ReactPivot extends Component {
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
            rows: this.props.rows.map((row, i) => {
                row.key = i;

                return row;
            })
        };
    }

    componentWillMount() {
        if (this.props.defaultStyles) loadStyles();

        this.updateRows();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.hiddenColumns !== this.props.hiddenColumns) this.setHiddenColumns(newProps.hiddenColumns);
        if (newProps.rows !== this.props.rows) this.updateRows();
    }

    @autobind
    getColumns() {
        const keys = Object.getOwnPropertyNames(this.props.columns);
        const columns = [];

        for (const column of keys) {
            if (this.state.hiddenColumns.indexOf(column) === -1) {
                columns.push({
                    // type: 'calculation',
                    title: column,
                    value: column
                    // className: d.className,
                    // template: d.template
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

        /*
        const sort = uwork(() => {
            console.log(this.state.db.sort(`${sortBy} ${sortDir}`));

            this.state.db.sort(`${sortBy} ${sortDir}`);
        });

        sort()
            .then((rows) => {
                this.props.eventBus.emit('sortBy', sortBy);
                this.props.eventBus.emit('sortDir', sortDir);

                this.setState({ sortBy, sortDir, rows });
            })
            .catch((error) => console.error(error));
        */


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
        const rows = this.sort(this.state.rows, sortBy, sortDir);

        this.setState({rows});
        this.props.onData(rows);
    }

    @autobind
    sort(array, field, direction) {
        const copy = array.slice(0);
        let param;

        if (this.isNumber(field)) param = +field;
        else if (!field) param = '';
        else param = field;

        const sorted = _.sortBy(array, param);

        return (direction === 'desc') ? sorted.reverse() : sorted;
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
