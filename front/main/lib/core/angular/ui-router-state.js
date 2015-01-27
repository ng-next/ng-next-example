// TODO: make alias
import NnNgModules from 'app/core/angular/nn-ng-modules';

export default class UiRouterState {
  constructor ( name, config ) {
    this._name = name;
    this._config = config;
  }

  registerAs ( angularModuleName ) {
    angular.module( angularModuleName, [] )
    .config( $stateProvider => {
      //noinspection BadExpressionStatementJS
      'ngInject';

      $stateProvider.state( this._name, this._config );
    });

    NnNgModules.register( angularModuleName );
  }
}
