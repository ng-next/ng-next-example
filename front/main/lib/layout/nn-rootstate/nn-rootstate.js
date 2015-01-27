//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'nnRootstate';

// needed to register directive module when unit testing
export default __moduleName;

// TODO: make alias
import { registerDirective } from 'app/core/angular/nn-register-ng-provider';

import template from './nn-rootstate.html!text';

export var ddo = {
  restrict : 'E',
  replace  : true,
  scope    : false,
  template : template
};

registerDirective( ngName, __moduleName, ddo );
