//noinspection BadExpressionStatementJS
'format es6';

let name = 'nnMainContent';

import { registerDirective } from 'nn-ng-helper';

import template from './nn-main-content.html!text';
import controller from './nn-main-content-controller';

export var ddo = {
  restrict : 'E',
  replace  : true,
  scope    : false, // the default, use parent
  template : template,
  controller   : controller,
  controllerAs : 'mainContent'
};

registerDirective( name, __moduleName, ddo );

export default __moduleName;
