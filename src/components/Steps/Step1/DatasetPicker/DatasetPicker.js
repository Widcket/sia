import React, {Component, PropTypes} from 'react';

import {Transfer} from 'antd';

export default class DatasetPicker extends Component {
    static propTypes = {

    }

    constructor() {
        super();

        this.state = {
            mockData: [],
            targetKeys: []
        };
    }

    componentDidMount() {
        this.getMock();
    }

    getMock() {
        const targetKeys = [];
        const mockData = [];

        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                title: `Dataset ${i + 1}`,
                description: `Desripción del dataset ${i + 1}`,
                chosen: Math.random() * 1.2 > 1,
            };

            if (data.chosen) targetKeys.push(data.key);

            mockData.push(data);
        }

        this.setState({ mockData, targetKeys });
    }

    filterOption(inputValue, option) {
        return option.description.indexOf(inputValue) > -1;
    }

    handleChange(targetKeys) {
        this.setState({ targetKeys });
    }

    render() {
        const styles = require('./DatasetPicker.scss');

        return (
            <Transfer className="picker"
              dataSource={this.state.mockData}
              targetKeys={this.state.targetKeys}
              filterOption={this.filterOption}
              titles={['', '']}
              searchPlaceholder="Buscar..."
              notFoundContent=""
              onChange={this.handleChange}
              render={item => item.title}
              showSearch
            />
        );
    }
}