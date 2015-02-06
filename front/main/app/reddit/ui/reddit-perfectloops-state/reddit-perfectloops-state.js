//noinspection BadExpressionStatementJS
'format es6';

let name =  'root.reddit.perfectloops';

import { registerUiState } from 'nn-ng-utils';

import controller from './reddit-perfectloops-state-controller';
import template from './reddit-perfectloops-state.html!text';

let config = {
  abstract     : false,
  url          : '^/reddit/perfectloops',
  template     : template,
  controller   : controller,
  controllerAs : 'redditPerfectloopsState',
  data         : {
    authenticationRequired : false
  }
};

registerUiState( name, config, __moduleName );

export default __moduleName;
