//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'nnMenuToolbar';

export default __moduleName;

// TODO: make alias
import { registerDirective } from 'app/core/angular/nn-register-ng-provider';

import template from './nn-menu-toolbar.html!text';

export var ddo = {
  restrict : 'E',
  replace  : true,
  template : template
};

registerDirective( ngName, __moduleName, ddo );
