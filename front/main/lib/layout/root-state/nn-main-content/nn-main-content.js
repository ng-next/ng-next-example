//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'nnMainContent';

export default __moduleName;

// TODO: make alias
import { registerDirective } from 'app/core/angular/nn-register-ng-provider';

import template from './nn-main-content.html!text';

export var ddo = {
  restrict : 'E',
  replace  : true,
  scope    : false, // the default, use parent
  template : template
};

registerDirective( ngName, __moduleName, ddo );
