import React, {Component} from 'react';

import ConnectForm from './ConnectForm/ConnectForm';
import DatasetPicker from './DatasetPicker/DatasetPicker';
import Spinner from './Spinner/Spinner';
import {autobind} from 'core-decorators';

// import { StepButton } from 'material-ui/Stepper';

class Step1 extends Component {
    constructor() {
        super();

        this.state = {
            stage: 0
        };
    }

    @autobind
    getStage(stage) {
        switch (stage) {
            case 0:
                return <ConnectForm />;
            case 1:
                return <Spinner active />;
            case 2:
                return <DatasetPicker />;
            default:
                return;
        }
    }

    render() {
        const styles = require('./Step1.scss');

        return (
            <div className="step1">
                {this.getStage(this.state.stage)}
            </div>
        );
    }
}

export default Step1;
