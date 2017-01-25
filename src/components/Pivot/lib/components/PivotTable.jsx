import {Button, Modal, Pagination, Popover, Tag} from 'antd';

import React from 'react';
import {autobind} from 'core-decorators';

const _ = { range: require('lodash/range') };
const partial = require('../partial');
const getValue = require('../getValue');

const Component = React.Component;
const ButtonGroup = Button.Group;

export default class PivotTable extends Component {
    static defaultProps = {
        columns: [],
        rows: [],
        sortBy: null,
        sortDir: 'asc',
        onSort: function () {},
        onSolo: function () {},
        onColumnHide: function () {}
    };

    constructor(props) {
        super(props);

        this.state = {
            paginatePage: 0,
            modalVisible: false
        };
    }

    @autobind
    setPaginatePage(nPage) {
        this.setState({paginatePage: nPage - 1});
    }

    @autobind
    showModal() {
        this.setState({
            modalVisible: true
        });
    }

    @autobind
    handleOk() {
        this.setState({
            modalVisible: false
        });
    }

    @autobind
    handleCancel(e) {
        this.setState({
            visible: false,
        });
    }

    @autobind
    paginate(results) {
        if (results.length <= 0) return {rows: results, nPages: 1, curPage: 0};

        let paginatePage = this.state.paginatePage;
        let nPaginateRows = this.props.nPaginateRows;

        if (!nPaginateRows || !isFinite(nPaginateRows)) nPaginateRows = results.length;

        const nPaginatePages = Math.ceil(results.length / nPaginateRows);

        if (paginatePage >= nPaginatePages) paginatePage = nPaginatePages - 1;

        const iBoundaryRow = paginatePage * nPaginateRows;
        let boundaryLevel = results[iBoundaryRow]._level;
        const parentRows = [];

        if (boundaryLevel > 0) {
            for (let i = iBoundaryRow - 1; i >= 0; i--) {
                if (results[i]._level < boundaryLevel) {
                    parentRows.unshift(results[i]);
                    boundaryLevel = results[i]._level;
                }
                if (results[i._level === 9]) break;
            }
        }

        const iEnd = iBoundaryRow + nPaginateRows;
        const rows = parentRows.concat(results.slice(iBoundaryRow, iEnd));

        return {rows: rows, nPages: nPaginatePages, curPage: paginatePage};
    }

    @autobind
    renderTableBody(columns, rows) {
        return (
            <tbody>
                {rows.map((row) => {
                    return (
                    <tr key={row._key} className={'reactPivot-level-' + row._level}>
                    {columns.map((col, i) => {
                        if (i < row._level) return <td key={i} className="reactPivot-indent" />;

                        return this.renderCell(col, row);
                    })}
                    </tr>
                    );
                })}
            </tbody>
        );
    }

    @autobind
    renderCell(col, row) {
        let val;
        let text;
        let dimensionExists;
        let solo;

        if (col.type === 'dimension') {
            val = row[col.title];
            text = val;
            dimensionExists = (typeof val) !== 'undefined';

            if (col.template && dimensionExists) text = col.template(val, row);
        } else {
            val = getValue(col, row);
            text = val;

            if (col.template) text = col.template(val, row);
        }

        if (dimensionExists) {
            solo = (
                <div className="tag-solo" style={{opacity: 0, display: 'inline-block'}}>
                    <Tag className="reactPivot-solo" >
                        <a style={{cursor: 'pointer'}}
                          onClick={partial(this.props.onSolo, {
                              title: col.title,
                              value: val
                          })}>Filtrar</a>
                    </Tag>
                </div>
            );
        }

        return (
            <td className={col.className}
              key={[col.title, row.key].join('\xff')}
              title={col.title}>
                <span dangerouslySetInnerHTML={{__html: text || ''}} /> {solo}
            </td>
        );
    }

    @autobind
    renderPagination(pagination) {
        const nPaginatePages = pagination.nPages;
        const paginatePage = pagination.curPage;

        if (nPaginatePages === 1) return '';

        return (
            <div className="reactPivot-paginate">
                <Pagination
                  current={this.state.paginatePage + 1}
                  total={this.props.rows.length}
                  defaultPageSize={25}
                  onChange={this.setPaginatePage} />
                {
                    /*
                    {_.range(0, nPaginatePages).map((n) => {
                        let c = 'reactPivot-pageNumber';

                        if (n === paginatePage) c += ' is-selected';

                        return (
                            <span className={c} key={n}>
                                <a onClick={partial(this.setPaginatePage, n)}>{n + 1}</a>
                            </span>
                        );
                    })}
                    */
                 }
            </div>
        );
    }

    @autobind
    renderTableHead(columns) {
        const sortBy = this.props.sortBy;
        const sortDir = this.props.sortDir;

        return (
            <thead>
                <tr>
                { columns.map((col) => {
                    let className = col.className;

                    if (col.title === sortBy) className += ' ' + sortDir;

                    const th = (
                        <th className={className}
                          onClick={partial(this.props.onSort, col.title)}
                          style={{cursor: 'pointer'}}
                          key={col.title}>
                            {col.title}
                        </th>
                    );
                    const buttonBar = (
                        <ButtonGroup>
                            <Button
                              type="default"
                              icon="delete"
                              onClick={partial(this.props.onColumnHide, col.title)} />
                            <Button
                              type="default"
                              icon="edit"
                              onClick={this.showModal} />
                        </ButtonGroup>
                    );
                    const modal = (
                        <Modal
                          title="Editar Columna"
                          visible={this.state.modalVisible}
                          onOk={this.handleOk}
                          onCancel={this.handleCancel}
                          okText="Ok"
                          cancelText="Cancelar">
                            <p>some contents...</p>
                            <p>some contents...</p>
                            <p>some contents...</p>
                        </Modal>
                    );

                    if (col.type !== 'dimension') {
                        return (
                            <th className={className}
                              onClick={partial(this.props.onSort, col.title)}
                              style={{cursor: 'pointer'}}
                              key={col.title}>
                                <Popover
                                  content={buttonBar}
                                  title=""
                                  overlayStyle={{paddingLeft: 0, paddingRight: 0}}
                                  key={'header-' + col.title}>
                                    <span>{col.title}</span>
                                </Popover>
                                {modal}
                            </th>
                        );
                    }

                    return th;
                })}

                </tr>
            </thead>
        );
    }

    render() {
        const results = this.props.rows;
        const paginatedResults = this.paginate(results);
        const tBody = this.renderTableBody(this.props.columns, paginatedResults.rows);
        const tHead = this.renderTableHead(this.props.columns);

        return (
            <div className="reactPivot-results">
                <div className="reactPivot-table">
                    <table className={this.props.tableClassName}>
                        {tHead}
                        {tBody}
                    </table>
                </div>

                {this.renderPagination(paginatedResults)}
            </div>
        );
    }
}