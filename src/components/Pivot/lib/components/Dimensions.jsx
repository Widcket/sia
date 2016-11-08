import React from 'react';
import {Select} from 'antd';
import {autobind} from 'core-decorators';
import partial from '../partial';

const _ = {compact: require('lodash/compact')};

const Component = React.Component;
const Option = Select.Option;

export default class Dimensions extends Component {
    static defaultProps = {
        dimensions: [],
        selectedDimensions: [],
        onChange: function () {}
    };

    @autobind
    toggleDimension(iDimension, value) {
        const dimension = value;
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
            <Select
              size="small"
              value={selectedDimension}
              onSelect={partial(this.toggleDimension, i)}
              key={selectedDimension} >
                {this.props.dimensions.map((dimension) => {
                    return (
                        <Option
                          value={dimension.title}
                          key={dimension.title} >
                            {dimension.title}
                        </Option>
                    );
                })}
            </Select>
        );
    }

    render() {
        const selectedDimensions = this.props.selectedDimensions;
        const nSelected = selectedDimensions.length;

        if (nSelected < this.props.dimensions.length) {
            return (
                <div className="reactPivot-dimensions">
                    {selectedDimensions.map(this.renderDimension)}

                    <Select size="small" defaultValue="" onSelect={partial(this.toggleDimension, nSelected)}>
                        <Option value={''} disabled>Subdimensión...</Option>
                        {this.props.dimensions.map((dimension) => {
                            return <Option value={dimension.title} key={dimension.title}>{dimension.title}</Option>;
                        })}
                    </Select>
                </div>
            );
        }

        return (
            <div className="reactPivot-dimensions">
                {selectedDimensions.map(this.renderDimension)}
            </div>
        );
    }
}
