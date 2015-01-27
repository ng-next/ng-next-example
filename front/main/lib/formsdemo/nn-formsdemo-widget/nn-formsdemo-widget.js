//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'nnFormsdemoWidget';

// needed to register directive module when unit testing
export default __moduleName;

// TODO: make alias
import { registerDirective } from 'app/core/angular/nn-register-ng-provider';

import template from './nn-formsdemo-widget.html!text';
import controller from './nn-formsdemo-widget-controller';
//import link from './nn-formsdemo-widget-link';

export var ddo = {
  restrict     : 'E',
  replace      : true,
  transclude   : false,
  scope        : false, // the default, use parent
  //scope            : true, // prototypically inherit from parent
  //scope            : {  //
  //  oneWay : '@', // pass directive's attribute value in as string!
  // if directive attribute value is an expression, e.g.
  // {{vm.foo}} it gets evaluated and then passed in.
  // if vm.foo changes (e.g. by <input ng-model="vm.foo" ..>)
  // then binding still works and oneWay gets updated
  // accordingly (respectively the directive's template
  // elements that bind to it).
  // same as using attr.oneWay in link function
  //  expr   : '&', // execute method/expression in parent's context
  //  twoWay : '='  // pass directive's attribute value in as string ...
  // BUT two-way bind to the parent's property with the name
  // of the directive's attribute value
  //},
  //bindToController : true,
  controller   : controller,
  controllerAs : 'formsdemoWidget',
  template     : template
};

registerDirective( ngName, __moduleName, ddo );
