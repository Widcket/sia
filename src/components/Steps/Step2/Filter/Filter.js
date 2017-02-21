import {Button, Col, Input, Select, Tag} from 'antd';
import React, {PureComponent} from 'react';

import {autobind} from 'core-decorators';
import localIndexOf from 'locale-index-of';

const InputGroup = Input.Group;
const Option = Select.Option;

class Filter extends PureComponent {
    static propTypes = {
        file: React.PropTypes.object.isRequired,
        store: React.PropTypes.object.isRequired,
        actions: React.PropTypes.object.isRequired
    };

    componentWillMount() {
        this.props.actions.setFile(this.props.file);
    }

    @autobind
    getTags() {
        if (this.props.store.files[this.props.file.id].filters) {
            return this.props.store.files[this.props.file.id].filters.map((filter) => {
                return (
                    <Tag key={`${filter.field}-{filter.condition}`} afterClose={this.handleTagClose} closable>
                        {filter.tag}
                    </Tag>
                );
            });
        }

        return [];
    }

    @autobind
    getColumns() {
        return this.columns.map((field) => {
            return <Option key={field} value={field}>{field}</Option>;
        });
    }

    @autobind
    getFilterOptions(type) {
        if (this.props.store.validTypes.includes(type)) {
            const conditions = Object.getOwnPropertyNames(this.props.store.filterConditions[type]);

            return conditions.map((condition) => {
                return (
                    <Option
                      key={condition}
                      value={condition}>{this.props.store.filterConditions[type][condition]}
                    </Option>
                );
            });
        }
    }

    @autobind
    handleFilterFieldChange(event, option) {
        this.props.actions.setFilterField(this.props.file, event);
    }

    @autobind
    handleFilterConditionChange(event, option) {
        this.props.actions.setFilterCondition(this.props.file, event);
    }

    @autobind
    handleFilterValueChange(event, option) {
        event.persist();

        this.props.actions.setFilterValue(this.props.file, event.target.value);
    }

    @autobind
    handleTagClose(tag) {
        // TODO: Remove filter
    }

    @autobind
    handleFilterClick() {
        const filters = this.props.store.files[this.props.file.id].filters;
        const field = this.props.store.files[this.props.file.id].field;
        const condition = this.props.store.files[this.props.file.id].condition;
        const value = this.props.store.files[this.props.file.id].value;

        for (const filter of this.props.store.files[this.props.file.id].filters) {
            if (filter.field === field && filter.condition === filter.condition) {
                console.error('That filter already exists'); // TODO: Use a toast,
                                                             // or remove the options from the dropdowns, or disable it
                return;
            }
        }

        this.filter(field, condition, value);
        this.props.actions.isFiltering(this.props.file, true);
        this.props.actions.setFilterValue(this.props.file, '');
    }

    @autobind
    filter(field, condition, value) {
        const filter = {
            field,
            condition,
            value,
            tag: `${field} ${condition} ${value}`
        };
        const collator = new Intl.Collator('es-AR', {
            numeric: true,
            sensitivity: 'base',
            ignorePunctuation: true,
            usage: 'search'
        });
        const copyOfFilters = this.props.store.files[this.props.file.id].filters.slice(0);
        let filteredData = [...this.props.file.data];

        copyOfFilters.push(filter);

        for (const item of copyOfFilters) {
            filteredData = filteredData.filter((a) => { // TODO: Handle partial matches
                return collator.compare(a[item.field], item.value) === 0; // TODO: Put in a webworker
            });
        }

        this.props.actions.addFilter(this.props.file, filter);
        this.props.actions.setFilteredFiles(this.props.file, filteredData);
    }

    columns = this.props.file.fields ? Object.getOwnPropertyNames(this.props.file.fields) : [];

    render() {
        const styles = require('./Filter.scss');

        return (
            <div className="filter">
                <div className="new-filter">
                    <InputGroup compact>
                        <Select
                          defaultValue={this.columns[0]}
                          onSelect={this.handleFilterFieldChange}
                          dropdownMatchSelectWidth={false}>
                            {this.getColumns()}
                        </Select>
                        <Select
                          defaultValue={'equals'}
                          onSelect={this.handleFilterConditionChange}
                          dropdownMatchSelectWidth={false}>
                            {this.getFilterOptions('string')}
                        </Select>
                        <Input
                          style={{ width: '35%', minWidth: '5rem' }}
                          value={
                                this.props.store.files[this.props.file.id].value ?
                                this.props.store.files[this.props.file.id].value :
                                ''
                            }
                          onChange={this.handleFilterValueChange} />
                        <Button onClick={this.handleFilterClick}>Filtrar</Button>
                    </InputGroup>
                </div>
                <div className="filters">
                    {this.getTags()}
                </div>
            </div>
        );
    }
}

export default Filter;