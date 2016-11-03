import React, {Component} from 'react';
import {StepButton} from 'material-ui/Stepper';

export default class Step4 extends Component {
    render() {
        const styles = require('./Step4.scss');

        return (
            <div className={styles.step}>
                <p>Hola mundo</p>
            </div>
        );
    }
}
