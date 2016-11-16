import {Button, Checkbox, Col, Form, Icon, Input, Row} from 'antd';
import React, {Component} from 'react';

import {autobind} from 'core-decorators';

const FormItem = Form.Item;

class Step4 extends Component {
    @autobind
    handleSubmit(e) {
        e.preventDefault();

        this
            .props
            .form
            .validateFields((err, values) => {
                if (err) return;

                console.log('Received values of form: ', values);
            });
    }

    render() {
        const styles = require('./Step4.scss');
        const {getFieldDecorator} = this.props.form;

        const colSizeXS = { span: 16, offset: 4 };
        const colSizeSM = { span: 12, offset: 6 };
        const colSizeMD = { span: 12, offset: 6 };
        const colSizeLG = { span: 12, offset: 6 };

        return (
            <div id="step4">
                <Row>
                    <Col xs={colSizeXS} sm={colSizeSM} md={colSizeMD} lg={colSizeLG} className="col">
                        <Form onSubmit={this.handleSubmit} className="export-form">
                            <FormItem>
                                {getFieldDecorator('text', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Debes ingresar un título'
                                        }
                                    ]
                                })(
                                    <Input type="text" placeholder="Título" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('url', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Debes ingresar una descripción'
                                        }
                                    ]
                                })(
                                    <Input type="text" placeholder="Descripción" type="textarea" rows={2} />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('token', {
                                    rules: [
                                        {
                                            required: false
                                        }
                                    ]
                                })(
                                    <Input type="text" placeholder="Notas" type="textarea" rows={4} />
                                )}
                            </FormItem>
                            <FormItem>
                                <Checkbox>Incluir tabla con los datos</Checkbox>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="export-button">
                                    Exportar
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(Step4);