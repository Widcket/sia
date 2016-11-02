import React, {Component, PropTypes} from 'react';

export default class NavigationBottom extends Component {
    static propTypes = {

    }

    render() {
        const styles = require('./NavigationBottom.scss');

        return (
            <div className={styles.steps}>
                <p>NavigationBottom</p>
            </div>
        );
    }
}
