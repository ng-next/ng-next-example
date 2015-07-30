//noinspection BadExpressionStatementJS
'format es6';

let name = 'nnMenuContent';

import { registerDirective } from 'nn-ng-utils';

import template from './nn-menu-content.html!text';
import controller from './nn-menu-content-controller';

export var ddo = {
  restrict         : 'E',
  replace          : true,
  template         : template,
  controller       : controller,
  controllerAs     : 'menuContent',
  bindToController : true,
  scope            : true
};

registerDirective( name, ddo );
