//noinspection BadExpressionStatementJS
'format es6';

let name = 'nnMainToolbar';

import { registerDirective } from 'nn-ng-utils';

import template from './nn-main-toolbar.html!text';
import controller from './nn-main-toolbar-controller';

export var ddo = {
  restrict         : 'E',
  replace          : true,
  template         : template,
  controller       : controller,
  controllerAs     : 'mainToolbar',
  bindToController : true,
  scope            : true
};

registerDirective( name, __moduleName, ddo );

export default __moduleName;
