//noinspection BadExpressionStatementJS
'format es6';

let name = 'nnRootstate';

import { registerDirective } from 'nn-ng-utils';

import template from './nn-rootstate.html!text';

export var ddo = {
  restrict : 'E',
  replace  : true,
  scope    : false,
  template : template
};

registerDirective( name, __moduleName, ddo );

export default __moduleName;
