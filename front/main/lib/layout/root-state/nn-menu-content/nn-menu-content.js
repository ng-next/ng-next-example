//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'nnMenuContent';

export default __moduleName;

// TODO: make alias
import { registerDirective } from 'app/core/angular/nn-register-ng-provider';

import template from './nn-menu-content.html!text';
import controller from './nn-menu-content-controller';

export var ddo = {
  restrict         : 'E',
  replace          : true,
  template         : template,
  controller       : controller,
  controllerAs     : 'vm',
  bindToController : true,
  scope            : true
};

registerDirective( ngName, __moduleName, ddo );
