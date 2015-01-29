//noinspection BadExpressionStatementJS
'format es6';

import { nnNgModules } from 'nn-ng-helper';

export var registerUiState = function (
  ngUiStateName,
  stateConfig,
  ngModuleName
) {
  angular.module( ngModuleName, [] )
  .config( $stateProvider => {
    //noinspection BadExpressionStatementJS
    'ngInject';

    $stateProvider.state( ngUiStateName, stateConfig );
  });

  nnNgModules.register( ngModuleName );
};
