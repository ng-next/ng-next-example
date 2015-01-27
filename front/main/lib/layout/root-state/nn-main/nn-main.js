//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'nnMain';

export default __moduleName;

// TODO: make alias
import { registerDirective } from 'app/core/angular/nn-register-ng-provider';

import template from './nn-main.html!text';
import controller from './nn-main-controller';

export var ddo = {
  restrict     : 'E',
  replace      : true,
  transclude   : true,
  template     : template,
  controller   : controller,
  controllerAs : 'vm'
};

registerDirective( ngName, __moduleName, ddo );
