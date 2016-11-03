import React, { Component, PropTypes } from 'react';
import { Stepper, Step, StepLabel, StepButton } from 'material-ui/Stepper';

export default class NavigationTop extends Component {
    static propTypes = {

    }

    render() {
        const styles = require('./NavigationTop.scss');
        const steps = [
            <Step key="Step1" active>
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
                <Stepper activeStep={0} orientation="horizontal" linear>
                    {steps}
                </Stepper>
            </div>
        );
    }
}
