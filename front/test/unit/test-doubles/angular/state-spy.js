//noinspection BadExpressionStatementJS
'format es6';

import _ from 'lodash';

export default class StateSpy {
  constructor () {
    this._transitionToWasCalled = false;
    this._stateName = undefined;
    this._params = undefined;

    this.transitionTo.CalledWith = stateName => {
      return ( this._transitionToWasCalled && this._stateName === stateName );
    };

    this.transitionTo.CalledWithParams = ( stateName, params ) => {
      return this._transitionToWasCalled && this._stateName === stateName &&
        _.isEqual( this._params, params );
    };
  }

  transitionTo ( stateName, params ) {
    this._stateName = stateName;
    this._params = params;
    this._transitionToWasCalled = true;
  }
}
