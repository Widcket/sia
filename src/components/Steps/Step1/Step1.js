import React, {Component, PropTypes} from 'react';

import ConnectForm from './ConnectForm/ConnectForm';
import DatasetPicker from './DatasetPicker/DatasetPicker';
import Spinner from './Spinner/Spinner';
import {autobind} from 'core-decorators';

class Step1 extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
        // actions: PropTypes.object.isRequired
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
            <div id="step1">
                {this.getStage(this.props.store.stage)}
            </div>
        );
    }
}

export default Step1;
