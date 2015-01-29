//noinspection BadExpressionStatementJS
'format es6';

export default class StateSpy {
  constructor () {
    this._transitionToWasCalled = false;
    this._stateName = undefined;

    this.transitionTo.CalledWith = stateName => {
      return ( this._transitionToWasCalled && this._stateName === stateName );
    }
  }

  transitionTo ( stateName ) {
    this._stateName = stateName;
    this._transitionToWasCalled = true;
  }
}
