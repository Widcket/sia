import React from 'react';
import {autobind} from 'core-decorators';

const _ = {compact: require('lodash/compact')};
const partial = require('../partial');

const Component = React.Component;

export default class Dimensions extends Component {
    static defaultProps = {
        dimensions: [],
        selectedDimensions: [],
        onChange: function () {}
    };

    @autobind
    toggleDimension(iDimension, event) {
        const dimension = event.target.value;
        const dimensions = this.props.selectedDimensions;
        const curIdx = dimensions.indexOf(dimension);

        if (curIdx >= 0) dimensions[curIdx] = null;
        dimensions[iDimension] = dimension;

        const updatedDimensions = _.compact(dimensions);

        this.props.onChange(updatedDimensions);
    }

    @autobind
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
        const selectedDimensions = this.props.selectedDimensions;
        const nSelected = selectedDimensions.length;

        return (
            <div className="reactPivot-dimensions">
                {selectedDimensions.map(this.renderDimension)}

                <select value={''} onChange={partial(this.toggleDimension, nSelected)}>
                <option value={''}>Sub Dimension...</option>
                {this.props.dimensions.map((dimension) => {
                    return <option key={dimension.title}>{dimension.title}</option>;
                })}
                </select>
            </div>
        );
    }
}
