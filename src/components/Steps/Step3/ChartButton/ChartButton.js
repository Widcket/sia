import React, {PropTypes, PureComponent} from 'react';

import FatButton from '../FatButton/FatButton';
import {autobind} from 'core-decorators';

export default class ChartButton extends PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        iconClass: PropTypes.string.isRequired,
        chartType: PropTypes.object.isRequired,
        activeType: PropTypes.object.isRequired,
        setChartType: PropTypes.func.isRequired
    }

    @autobind
    runSetChartType() {
        this.props.setChartType(this.props.chartType, null);
    }

    render() {
        const selected = this.props.chartType.value === this.props.activeType.value;

        return (
        <FatButton
          label={this.props.label}
          iconClass={this.props.iconClass}
          selected={selected}
          onClick={this.runSetChartType} />
        );
    }
}