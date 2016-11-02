import React, {Component} from 'react';

export default class Step2 extends Component {
    render() {
        const styles = require('./Step2.scss');

        return (
            <div className={styles.step}>
                <p>Hola mundo</p>
            </div>
        );
    }
}
