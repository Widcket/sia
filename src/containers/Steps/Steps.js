import React, {Component, PropTypes} from 'react';
import {Step1, Step2, Step3, Step4} from '../../components';

import {Steps as Stepper} from 'antd';

const Step = Stepper.Step;

export default class Steps extends Component {
    static propTypes = {

    }

    constructor() {
        super();

        this.state = {
            finished: false,
            current: 1
        };
    }

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

    handleNext = () => {
        const {current} = this.state;

        this.setState({
            current: current + 1,
            finished: current >= 3
        });
    }

    handlePrev = () => {
        const {current} = this.state;

        if (current > 0) this.setState({current: current - 1});
    }

    render() {
        const styles = require('./Steps.scss');
        const {finished, current} = this.state;

        const steps = [
            <Step key="Step1" title="Agregar datos" description="Elige datasets" />,
            <Step key="Step2" title="Preparar" description="Afina los datos" />,
            <Step key="Step3" title="Graficar" description="Visualízalos" />,
            <Step key="Step4" title="Exportar" description="Descarga la app" />
        ];

        return (
            <div>
                <Stepper current={current} id="steps">
                    {steps}
                </Stepper>
                {this.getStep(current)}
            </div>
        );
    }
}
