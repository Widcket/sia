import React, { Component, PropTypes } from 'react';

import {autobind} from 'core-decorators';

export default class FatButton extends Component {
    static propTypes = {
        iconClass: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool
    }

    @autobind
    getClassNames() {
        const base = 'type';

        if (this.props.selected) return `${base} selected`;
        return base;
    }

    render() {
        const styles = require('./FatButton.scss');

        return (
            <div className={this.getClassNames()}>
                <i className={this.props.iconClass} />
                <span>{this.props.label}</span>
            </div>
        );
    }
}
