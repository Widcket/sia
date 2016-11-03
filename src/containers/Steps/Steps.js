import React, {Component, PropTypes} from 'react';
import {Step1, Step2, Step3, Step4} from '../../components';

import {Steps as Stepper} from 'antd';

// import {Step, StepLabel, Stepper} from 'material-ui/Stepper';

const Step = Stepper.Step;

export default class Steps extends Component {
    static propTypes = {

    }

    constructor() {
        super();

        this.state = {
            finished: false,
            stepIndex: 0
        };
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <Step1 />;
            case 1:
                return <Step2 />;
            case 2:
                return <Step3 />;
            case 3:
                return <Step4 />;
            default:
                return '';
        }
    }

    handleNext = () => {
        const {stepIndex} = this.state;

        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2
        });
    }

    handlePrev = () => {
        const {stepIndex} = this.state;

        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    }

    render() {
        const styles = require('./Steps.scss');
        const {finished, stepIndex} = this.state;

/* Material
        const steps = [
            <Step key="Step1">
                <StepLabel>
                    First Step
                </StepLabel>
            </Step>,
            <Step key="Step2">
                <StepLabel>
                    Second Step
                </StepLabel>
            </Step>,
            <Step key="Step3">
                <StepLabel>
                    Third Step
                </StepLabel>
            </Step>,
            <Step key="Step4">
                <StepLabel>
                    Fourth Step
                </StepLabel>
            </Step>
        ];

        return (
            <div className={styles.steps}>
                <Stepper activeStep={stepIndex}>
                    {steps}
                </Stepper>
                {this.getStepContent(stepIndex)}
            </div>
        );
*/

        const steps = [
            <Step key="Step1" title="First Step" description="Description 1" />,
            <Step key="Step2" title="Second Step" description="Description 2" />,
            <Step key="Step3" title="Third Step" description="Description 3" />,
            <Step key="Step4" title="Fourth Step" description="Description 4" />
        ];

        return (
            <div>
                <Stepper current={stepIndex} className={styles.steps}>
                    {steps}
                </Stepper>
                {this.getStepContent(stepIndex)}
            </div>
        );
    }
}
