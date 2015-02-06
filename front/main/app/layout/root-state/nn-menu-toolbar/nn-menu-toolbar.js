//noinspection BadExpressionStatementJS
'format es6';

let name = 'nnMenuToolbar';

import { registerDirective } from 'nn-ng-utils';

import template from './nn-menu-toolbar.html!text';

export var ddo = {
  restrict : 'E',
  replace  : true,
  template : template
};

registerDirective( name, __moduleName, ddo );

export default __moduleName;
