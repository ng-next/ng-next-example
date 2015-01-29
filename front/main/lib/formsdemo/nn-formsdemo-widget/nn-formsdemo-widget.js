//noinspection BadExpressionStatementJS
'format es6';

let name = 'nnFormsdemoWidget';

import { registerDirective } from 'nn-ng-utils';

import template from './nn-formsdemo-widget.html!text';
import controller from './nn-formsdemo-widget-controller';

export var ddo = {
  restrict     : 'E',
  replace      : true,
  transclude   : false,
  scope        : false,
  controller   : controller,
  controllerAs : 'formsdemoWidget',
  template     : template
};

registerDirective( name, __moduleName, ddo );

export default __moduleName;
