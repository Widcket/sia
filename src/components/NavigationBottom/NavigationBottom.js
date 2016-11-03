import React, {Component, PropTypes} from 'react';

export default class NavigationBottom extends Component {
    static propTypes = {

    }

    render() {
        const styles = require('./NavigationBottom.scss');

        return (
            <div className="navigation-bottom">
                <p>NavigationBottom</p>
            </div>
        );
    }
}
