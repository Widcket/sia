import React, {Component, PropTypes} from 'react';
import {Step1, Step2, Step3, Step4} from '../../components';

import {Steps as Stepper} from 'antd';
import {autobind} from 'core-decorators';

const Step = Stepper.Step;

export default class Steps extends Component {
    static propTypes = {
        step: PropTypes.number.isRequired
    }

    @autobind
    getStep(current) {
        switch (current) {
            case 0:
                return <Step1 />;
            case 1:
                return <Step2 />;
            case 2:
                return <Step3 />;
            case 3:
                return <Step4 />;
            default:
                return;
        }
    }

    render() {
        const styles = require('./Steps.scss');

        const steps = [
            <Step key="Step1" title="Agregar datos" description="Elige datasets" />,
            <Step key="Step2" title="Preparar" description="Afina los datos" />,
            <Step key="Step3" title="Graficar" description="Visualízalos" />,
            <Step key="Step4" title="Exportar" description="Descarga la app" />
        ];

        return (
            <div>
                <Stepper current={this.props.step} id="steps">
                    {steps}
                </Stepper>
                {this.getStep(this.props.step)}
            </div>
        );
    }
}
