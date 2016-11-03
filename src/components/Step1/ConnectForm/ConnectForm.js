import {Button, Form, Icon, Input} from 'antd';
import React, {Component} from 'react';

const FormItem = Form.Item;

class ConnectForm extends Component {
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
        const styles = require('./ConnectForm.scss');
        const {getFieldDecorator} = this.props.form;

        return (
            <div className={styles.form}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('url', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Debes ingresar una URL válida'
                                }
                            ]
                        })(
                            <Input addonBefore={<Icon type="link" />} placeholder="URL" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('token', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Debes ingresar un token'
                                }
                            ]
                        })(
                            <Input
                              addonBefore={<Icon type="lock" />}
                              type="text"
                              placeholder="Token" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Conectar
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(ConnectForm);
