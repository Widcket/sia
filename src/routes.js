import {App, NotFound} from './containers';
import {IndexRoute, Route} from 'react-router';

import React from 'react';

export default(store) => {
  /**
   * Please keep routes in alphabetical order
   */
    return (
      <div>
        <Route path="/" component={App} />
        <Route path="*" component={NotFound} status={404} />
      </div>
    );
};
