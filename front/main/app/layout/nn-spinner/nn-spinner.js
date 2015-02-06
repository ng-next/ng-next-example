//noinspection BadExpressionStatementJS
'format es6';

let name = 'nnSpinner';

import { registerDirective } from 'nn-ng-utils';

import './nn-spinner-service';
import './nn-spinner-ng-config';
import template from './nn-spinner.html!text';
import controller from './nn-spinner-controller';

export var ddo = {
  restrict     : 'E',
  replace      : true,
  template     : template,
  controller   : controller,
  controllerAs : 'spinner',
  scope        : {}
};

registerDirective( name, __moduleName, ddo );

export default __moduleName;
