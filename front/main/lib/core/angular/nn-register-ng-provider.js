//noinspection BadExpressionStatementJS
'format es6';

import { nnNgModules } from 'nn-ng-helper';

export var registerFactory = (
  ngFactoryName,
  ngModuleName,
  factory
) => {
  register( 'factory', ngFactoryName, ngModuleName, factory );
};

export var registerProvider = (
  ngProviderName,
  ngModuleName,
  provider
) => {
  register( 'provider', ngProviderName, ngModuleName, provider );
};

export var registerService = (
  ngServiceName,
  ngModuleName,
  constructor
) => {
  register( 'service', ngServiceName, ngModuleName, constructor );
};

export var registerDirective = (
  ngDirectiveName,
  ngModuleName,
  ddo
) => {
  register( 'directive', ngDirectiveName, ngModuleName, () => ddo );
};

function register (
  type,
  ngProviderName,
  ngModuleName,
  constructorOrFactory
) {
  guardAgainstUnknownProviderType();
  callAngularRegisterProviderDynamicallyByType();
  nnNgModules.register( ngModuleName );

  function guardAgainstUnknownProviderType () {
    if ( type !== 'factory' &&
         type !== 'service' &&
         type !== 'provider' &&
         type !== 'directive'
    ) {
      throw new Error( `unknown angular provider type "${type}"` );
    }
  }

  function callAngularRegisterProviderDynamicallyByType () {
    angular.module( ngModuleName, [] )[ type ](
      ngProviderName, constructorOrFactory
    );
  }
}
