import {App, NotFound} from './containers';
import {IndexRoute, Route} from 'react-router';

import React from 'react';
import {Step1} from './components/Steps/Step1/Step1';

export default(store) => {
  /**
   * Please keep routes in alphabetical order
   */
    return (
      <Route path="/" component={App}>
          {/* Step1 (main) route */}
          <IndexRoute component={Step1} />
          {/* Catch all route */}
          <Route path="*" component={NotFound} status={404} />
      </Route>
    );
};
