import {Button, Col, Input, Select} from 'antd';
import React, {PureComponent} from 'react';

import {autobind} from 'core-decorators';

const InputGroup = Input.Group;
const Option = Select.Option;

class Filter extends PureComponent {
    static propTypes = {
        file: React.PropTypes.object
    };

    static defaultProps = {
        file: {}
    };

    @autobind
    getColumns() {
        return this.columns.map((field) => {
            return <Option key={field} value={field}>{field}</Option>;
        });
    }

    columns = Object.getOwnPropertyNames(this.props.file.fields);

    render() {
        const styles = require('./Filter.scss');

        return (
            <div className="filter">
                <InputGroup compact>
                    <Select defaultValue={this.columns[0]}>
                        {this.getColumns()}
                    </Select>
                    <Select defaultValue="Option1">
                        <Option value="Option1">Option1</Option>
                        <Option value="Option2">Option2</Option>
                    </Select>
                    <Input style={{ width: '20%', minWidth: '5rem' }} defaultValue="" />
                    <Button>Filtrar</Button>
                </InputGroup>
            </div>
        );
    }
}

export default Filter;