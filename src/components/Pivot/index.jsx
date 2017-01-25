import React, {Component} from 'react';

import DataFrame from 'dataframe';
import Emitter from 'wildemitter';
import {Tag} from 'antd';
import {autobind} from 'core-decorators';

const _ = {
    filter: require('lodash/filter'),
    map: require('lodash/map'),
    find: require('lodash/find')
};
const partial = require('./lib/partial');
const download = require('./lib/download');
const getValue = require('./lib/getValue');
const PivotTable = require('./lib/components/PivotTable.jsx');
const Dimensions = require('./lib/components/Dimensions.jsx');
const ColumnControl = require('./lib/components/ColumnControl.jsx');

function loadStyles() { require('./style.css'); }

export default class ReactPivot extends Component {
    static defaultProps = {
        rows: [],
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
                return _.find(this.props.dimensions, (col) => {
                    return col.title === title;
                });
            }),
            calculations: {},
            sortBy: this.props.sortBy,
            sortDir: this.props.sortDir,
            hiddenColumns: this.props.hiddenColumns,
            solo: this.props.solo,
            rows: []
        };
    }

    componentWillMount() {
        if (this.props.defaultStyles) loadStyles();

        this.dataFrame = DataFrame({
            rows: this.props.rows,
            dimensions: this.props.dimensions,
            reduce: this.props.reduce
        });

        this.updateRows();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.hiddenColumns !== this.props.hiddenColumns) {
            this.setHiddenColumns(newProps.hiddenColumns);
        }

        if (newProps.rows !== this.props.rows) {
            this.dataFrame = DataFrame({
                rows: newProps.rows,
                dimensions: this.props.dimensions,
                reduce: this.props.reduce
            });

            this.updateRows();
        }
    }

    @autobind
    getColumns() {
        const self = this;
        const columns = [];

        this.state.dimensions.forEach((title) => {
            const d = _.find(self.props.dimensions, (col) => {
                return col.title === title;
            });

            columns.push({
                type: 'dimension',
                title: d.title,
                value: d.value,
                className: d.className,
                template: d.template
            });
        });

        if (this.props.calculations) {
            this.props.calculations.forEach((c) => {
                if (self.state.hiddenColumns.indexOf(c.title) >= 0) return;

                columns.push({
                    type: 'calculation',
                    title: c.title,
                    template: c.template,
                    value: c.value,
                    className: c.className
                });
            });
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

        if (sortBy === cTitle) {
            sortDir = (sortDir === 'asc') ? 'desc' : 'asc';
        } else {
            sortBy = cTitle;
            sortDir = 'asc';
        }

        this.props.eventBus.emit('sortBy', sortBy);
        this.props.eventBus.emit('sortDir', sortDir);
        this.setState({ sortBy: sortBy, sortDir: sortDir });

        setTimeout(this.updateRows, 0);
    }

    @autobind
    setSolo(solo) {
        this.props.eventBus.emit('solo', solo);
        this.setState({ solo: solo });

        setTimeout(this.updateRows, 0);
    }

    @autobind
    updateRows() {
        const columns = this.getColumns();

        const sortByTitle = this.state.sortBy;
        const sortCol = _.find(columns, (col) => {
            return col.title === sortByTitle;
        }) || {};
        const sortBy = sortCol.type === 'dimension' ? sortCol.title : sortCol.value;
        const sortDir = this.state.sortDir;

        const calcOpts = {
            dimensions: this.state.dimensions,
            sortBy: sortBy,
            sortDir: sortDir,
            compact: this.props.compact
        };

        const filter = this.state.solo;

        if (filter) {
            calcOpts.filter = function (dVals) {
                return dVals[filter.title] === filter.value;
            };
        }

        const rows = this.dataFrame.calculate(calcOpts);

        this.setState({rows: rows});
        this.props.onData(rows);
    }

    @autobind
    clearSolo() {
        this.props.eventBus.emit('solo', null);
        this.setState({ solo: null });

        setTimeout(this.updateRows, 0);
    }

    @autobind
    hideColumn(cTitle) {
        const hidden = this.state.hiddenColumns.concat([cTitle]);

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
                { this.props.hideDimensionFilter ? '' :
                    <Dimensions
                      dimensions={this.props.dimensions}
                      selectedDimensions={this.state.dimensions}
                      onChange={this.setDimensions} />
                }

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

                { !this.state.solo ? '' :
                    <div style={{clear: 'both'}} className="reactPivot-soloDisplay">
                        <Tag className="reactPivot-clearSolo" closable onClose={this.clearSolo}>
                            {this.state.solo.title}: {this.state.solo.value}
                        </Tag>
                    </div>
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
