import React, {Component, PropTypes} from 'react';

export default class Navigation extends Component {
    static propTypes = {

    }

    render() {
        const styles = require('./Navigation.scss');

        return (
            <div className="navigation">
                <p>Navigation</p>
            </div>
        );
    }
}
