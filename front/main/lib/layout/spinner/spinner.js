//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'ngmSpinner';

export default __moduleName;

// TODO: make alias
import { registerDirective } from 'app/core/angular/nn-register-ng-provider';

import './spinner-service';
import template from './spinner.html!text';
import controller from './spinner-controller';

export var ddo = {
  restrict     : 'E',
  replace      : true,
  template     : template,
  controller   : controller,
  controllerAs : 'spinnerController',
  scope        : {}
};

registerDirective( ngName, __moduleName, ddo );
