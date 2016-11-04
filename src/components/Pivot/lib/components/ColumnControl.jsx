const _ = { without: require('lodash/without') };
const React = require('react');

const Component = React.Component;

export default class ColumnControl extends Component {
    constructor() {
        super();

        this.props = {
            hiddenColumns: [],
            onChange: function () {}
        };
    }

    showColumn(evt) {
        const col = evt.target.value;
        const hidden = _.without(this.props.hiddenColumns, col);

        this.props.onChange(hidden);
    }

    render() {
        return (
            <div className="reactPivot-columnControl">
                { !this.props.hiddenColumns.length ? '' :
                <select value={''} onChange={this.showColumn}>
                    <option value={''}>Hidden Columns</option>
                    { this.props.hiddenColumns.map((column) => {
                        return <option key={column}>{column}</option>;
                    })}
                </select>
                }
            </div>
        );
    }
}
