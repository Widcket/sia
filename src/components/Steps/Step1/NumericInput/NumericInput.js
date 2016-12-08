import {Input, Tooltip} from 'antd';
import React, {Component, PropTypes} from 'react';

import {autobind} from 'core-decorators';

function formatNumber(value) {
    let num = value;
    let result = '';

    num += '';

    while (num.length > 3) {
        result = `.${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) result = num + result;

    return result;
}

class NumericInput extends Component {
    @autobind
    onChange(e) {
        const {value} = e.target;
        const reg = /^(0|[1-9][0-9]*)$/;

        if (((!isNaN(value) && reg.test(value)) || value === '') &&
            (value >= this.props.min && value <= this.props.max)) {
            this.props.onChange(value);
        }
    }

    @autobind
    onBlur() {
        const {value} = this.props;

        if (this.props.onBlur) this.props.onBlur();
    }

    render() {
        const {value} = this.props;
        const title = (
            value ? (<span className="numeric-input-title"> {formatNumber(value)} </span>) : ''
        );

        return (
            <div>
                <Tooltip
                  trigger={['focus']}
                  title={title}
                  placement="topLeft"
                  overlayClassName="numeric-input">
                <Input
                  {...this.props}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  placeholder="Ingresa un número"
                  maxLength="10" />
                </Tooltip>
            </div>
        );
    }
}