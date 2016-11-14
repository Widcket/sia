import React, {Component, PropTypes} from 'react';

export default class FatButton extends Component {
    static propTypes = {
        iconClass: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }

    render() {
        const styles = require('./FatButton.scss');

        return (
            <div className="type">
                <i className={this.props.iconClass} />
                <span>{this.props.label}</span>
            </div>
        );
    }
}
