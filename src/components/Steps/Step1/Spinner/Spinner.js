import React, {PureComponent} from 'react';

import {Spin} from 'antd';

class Spinner extends PureComponent {
    static propTypes = {
        active: React.PropTypes.bool
    };
    static defaultProps = { active: false };

    render() {
        const styles = require('./Spinner.scss');

        const colSizeXS = { span: 16, offset: 4 };
        const colSizeSM = { span: 12, offset: 6 };
        const colSizeMD = { span: 12, offset: 6 };
        const colSizeLG = { span: 12, offset: 6 };

        return (
            <Spin
              tip="Cargando datasets..."
              size="large"
              spinning={this.props.active}
              className="spinner spinner-solo" />
        );
    }
}

export default Spinner;