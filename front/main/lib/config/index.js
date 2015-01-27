//noinspection BadExpressionStatementJS
'format es6';

import configureRoutes from './configure-routes';
import configureSpinner from './configure-spinner';
import configureUiStateSecurity from './configure-ui-state-security';
import configureUiRouter from './configure-ui-router';
import configureMdToast from './configure-md-toast';
import configureLogging from './configure-logging';
import configureExceptions from './configure-exceptions';
import configureConstants from './configure-constants';

export default ( app ) => {
  [
    configureRoutes,
    configureSpinner,
    configureUiStateSecurity,
    configureUiRouter,
    configureMdToast,
    configureLogging,
    configureExceptions,
    configureConstants
  ]
  .map(( configure ) => configure( app ));
};
