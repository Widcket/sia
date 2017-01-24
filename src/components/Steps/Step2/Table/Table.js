import {Cell, Column, Table as FixedTable} from 'fixed-data-table';
import React, { PropTypes, PureComponent } from 'react';

import {autobind} from 'core-decorators';

export default class Table extends PureComponent {
    static propTypes = {
        files: PropTypes.object.isRequired,
        filter: PropTypes.string.isRequired
        // store: PropTypes.object.isRequired,
        // actions: PropTypes.object.isRequired
    };

    render() {
        const styles = require('./Table.scss');

        return (
            <div className="table">
                <p />
            </div>
        );
    }
}
