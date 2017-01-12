import React, {PropTypes, PureComponent} from 'react';

import Step1 from './Step1/Step1';
import Step2 from './Step2/Step2';
import Step3 from './Step3/Step3';
import Step4 from './Step4/Step4';
import {Steps as Stepper} from 'antd';
import {autobind} from 'core-decorators';

const Step = Stepper.Step;

export default class Steps extends PureComponent {
    static propTypes = {
        stores: PropTypes.shape({
            step1: PropTypes.object.isRequired,
            step2: PropTypes.object.isRequired,
            step3: PropTypes.object.isRequired,
            step4: PropTypes.object.isRequired
        }).isRequired,
        actions: PropTypes.shape({
            step1: PropTypes.object.isRequired,
            step2: PropTypes.object.isRequired,
            step3: PropTypes.object.isRequired,
            step4: PropTypes.object.isRequired,
            app: PropTypes.object.isRequired
        }).isRequired,
        files: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
        step: PropTypes.number.isRequired
    }

    @autobind
    getStep(current) {
        switch (current) {
            case 0:
                return (
                    <Step1
                      store={this.props.stores.step1}
                      actions={Object.assign({}, this.props.actions.step1, this.props.actions.app)} />
                );
            case 1:
                return (
                    <Step2
                      files={this.props.files}
                      data={this.props.data}
                      store={this.props.stores.step2}
                      actions={Object.assign({}, this.props.actions.step2, this.props.actions.app)} />
                );
            case 2:
                return (
                    <Step3
                      data={this.props.data}
                      store={this.props.stores.step3}
                      actions={Object.assign({}, this.props.actions.step3, this.props.actions.app)} />
                );
            case 3:
                return (
                    <Step4
                      data={this.props.data}
                      store={this.props.stores.step4}
                      actions={this.props.actions.step4} />
                );
            default:
                break;
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
