import React, {PureComponent} from 'react';

import {Spin} from 'antd';

class Spinner extends PureComponent {
    static propTypes = {
        legend: React.PropTypes.string,
        active: React.PropTypes.bool
    };
    static defaultProps = { active: false };

    render() {
        const styles = require('./Spinner.scss');

        return (
            <Spin
              tip={this.props.legend}
              size="large"
              spinning={this.props.active}
              className="spinner spinner-solo" />
        );
    }
}

export default Spinner;