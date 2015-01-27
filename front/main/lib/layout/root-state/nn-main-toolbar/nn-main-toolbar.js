//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'nnMainToolbar';

export default __moduleName;

// TODO: make alias
import { registerDirective } from 'app/core/angular/nn-register-ng-provider';

import template from './nn-main-toolbar.html!text';
import controller from './nn-main-toolbar-controller';

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
