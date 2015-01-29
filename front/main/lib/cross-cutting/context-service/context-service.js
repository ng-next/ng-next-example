/* jshint maxparams:false */
//noinspection BadExpressionStatementJS
'format es6';

let name = 'ctx';

import { registerService } from 'nn-ng-helper';

class CtxService {
  constructor (
    $q,
    $rootScope,
    $timeout,
    $interval,
    $window,
    $mdToast,
    $mdBottomSheet,
    $mdDialog,
    cnst,
    log
  ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    // common angular dependencies
    this.$q             = $q;
    this.$rootScope     = $rootScope;
    this.$timeout       = $timeout;
    this.$interval      = $interval;
    this.$window        = $window;
    this.$mdBottomSheet = $mdBottomSheet;
    this.$mdDialog      = $mdDialog;
    this.$mdToast       = $mdToast;
    // generic
    this.cnst           = cnst;
    this.log            = log;
  }

  $broadcast () {
    return this.$rootScope.$broadcast.apply( this.$rootScope, arguments );
  }

  isNumber ( val ) {
    // negative or positive
    return ( /^[-]?\d+$/ ).test( val );
  }

  textContains ( text, searchText ) {
    return text && -1 !==
      text.toLowerCase().indexOf( searchText.toLowerCase() );
  }
}

registerService( name, __moduleName, CtxService );

export default CtxService;
