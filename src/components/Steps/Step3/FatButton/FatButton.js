import React, {PropTypes, PureComponent} from 'react';

import {autobind} from 'core-decorators';

export default class FatButton extends PureComponent {
    static propTypes = {
        iconClass: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        selected: PropTypes.bool,
        onClick: PropTypes.func
    };

    static defaultProps = {
        selected: false,
        onClick: () => { }
    };

    @autobind
    getClassNames() {
        const base = 'type';

        if (this.props.selected) return `${base} selected`;
        return base;
    }

    render() {
        const styles = require('./FatButton.scss');

        return (
            <div className={this.getClassNames()} onClick={this.props.onClick}>
                <i className={this.props.iconClass} />
                <span>{this.props.label}</span>
            </div>
        );
    }
}
