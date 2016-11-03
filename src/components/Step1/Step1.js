import React, {Component} from 'react';
import {StepButton} from 'material-ui/Stepper';

export default class Step1 extends Component {
    render() {
        const styles = require('./Step1.scss');

        return (
            <div className={styles.step}>
                <p>Hola mundo</p>
            </div>
        );
    }
}
