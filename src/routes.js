import { App, NotFound } from 'containers';
import { IndexRoute, Route } from 'react-router';
import { Step1, Step2, Step3, Step4 } from 'components';

import React from 'react';

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
