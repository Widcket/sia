const _ = { compact: require('lodash/compact') };
const React = require('react');
const partial = require('./partial');

const Component = React.Component;

export default class Dimensions extends Component {
    constructor() {
        super();

        this.props = {
            dimensions: [],
            selectedDimensions: [],
            onChange: function () {}
        };
    }

    toggleDimension(iDimension, evt) {
        const dimension = evt.target.value;
        const dimensions = this.props.selectedDimensions;
        const curIdx = dimensions.indexOf(dimension);

        if (curIdx >= 0) dimensions[curIdx] = null;
        dimensions[iDimension] = dimension;

        const updatedDimensions = _.compact(dimensions);

        this.props.onChange(updatedDimensions);
    }

    renderDimension(selectedDimension, i) {
        return (
            <select
              value={selectedDimension}
              onChange={partial(this.toggleDimension, i)}
              key={selectedDimension} >
                <option />
                {this.props.dimensions.map((dimension) => {
                    return (
                    <option
                      value={dimension.title}
                      key={dimension.title} >
                    {dimension.title}
                    </option>
                    );
                })}
            </select>
        );
    }

    render() {
        const self = this;
        const selectedDimensions = this.props.selectedDimensions;
        const nSelected = selectedDimensions.length;

        return (
            <div className="reactPivot-dimensions">
                {selectedDimensions.map(this.renderDimension)}

                <select value={''} onChange={partial(self.toggleDimension, nSelected)}>
                <option value={''}>Sub Dimension...</option>
                {self.props.dimensions.map((dimension) => {
                    return <option key={dimension.title}>{dimension.title}</option>;
                })}
                </select>
            </div>
        );
    }
}
