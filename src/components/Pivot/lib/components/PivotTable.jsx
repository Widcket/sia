const _ = { range: require('lodash/range') };
const React = require('react');
const partial = require('./partial');
const getValue = require('./get-value');

const Component = React.Component;

export default class PivotTable extends Component {
    constructor() {
        super();

        this.props = {
            columns: [],
            rows: [],
            sortBy: null,
            sortDir: 'asc',
            onSort: function () {},
            onSolo: function () {},
            onColumnHide: function () {}
        };

        this.state = {
            paginatePage: 0
        };
    }

    setPaginatePage(nPage) {
        this.setState({paginatePage: nPage});
    }

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

    renderTableBody(columns, rows) {
        const self = this;

        return (
            <tbody>
                {rows.map((row) => {
                    return (
                    <tr key={row._key} className={'reactPivot-level-' + row._level}>
                    {columns.map((col, i) => {
                        if (i < row._level) return <td key={i} className="reactPivot-indent" />;

                        return self.renderCell(col, row);
                    })}
                    </tr>
                    );
                })}
            </tbody>
        );
    }

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
                <span className="reactPivot-solo">
                <a style={{cursor: 'pointer'}}
                  onClick={partial(this.props.onSolo, {
                      title: col.title,
                      value: val
                  })}>solo</a>
                </span>
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

    renderPagination(pagination) {
        const self = this;
        const nPaginatePages = pagination.nPages;
        const paginatePage = pagination.curPage;

        if (nPaginatePages === 1) return '';

        return (
            <div className="reactPivot-paginate">
                {_.range(0, nPaginatePages).map((n) => {
                    let c = 'reactPivot-pageNumber';

                    if (n === paginatePage) c += ' is-selected';
                    return (
                        <span className={c} key={n}>
                        <a onClick={partial(self.setPaginatePage, n)}>{n + 1}</a>
                        </span>
                    );
                })}
            </div>
        );
    }

    renderTableHead(columns) {
        const self = this;
        const sortBy = this.props.sortBy;
        const sortDir = this.props.sortDir;

        return (
            <thead>
                <tr>
                { columns.map((col) => {
                    let className = col.className;
                    if (col.title === sortBy) className += ' ' + sortDir;

                    let hide = '';
                    if (col.type !== 'dimension') {
                        hide = (
                    <span className="reactPivot-hideColumn"
                      onClick={partial(self.props.onColumnHide, col.title)}>
                        &times;
                    </span>
                    ); }

                    return (
                    <th className={className}
                      onClick={partial(self.props.onSort, col.title)}
                      style={{cursor: 'pointer'}}
                      key={col.title}>

                        {hide}
                        {col.title}
                    </th>
                    );
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
                <table className={this.props.tableClassName}>
                {tHead}
                {tBody}
                </table>

                {this.renderPagination(paginatedResults)}
            </div>
        );
    }


}

