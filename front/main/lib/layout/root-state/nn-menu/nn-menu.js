//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'nnMenu';

export default __moduleName;

// TODO: make alias
import { registerDirective } from 'app/core/angular/nn-register-ng-provider';

import template from './nn-menu.html!text';

export var ddo = {
  restrict   : 'E',
  replace    : true,
  transclude : true,
  template   : template
};

registerDirective( ngName, __moduleName, ddo );
