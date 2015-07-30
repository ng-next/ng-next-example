//noinspection BadExpressionStatementJS
'format es6';

let name = 'nnMenu';

import { registerDirective } from 'nn-ng-utils';

import template from './nn-menu.html!text';

export var ddo = {
  restrict   : 'E',
  replace    : true,
  transclude : true,
  template   : template
};

registerDirective( name, ddo );
