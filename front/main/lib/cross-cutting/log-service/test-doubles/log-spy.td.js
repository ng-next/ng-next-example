//noinspection BadExpressionStatementJS
'format es6';

export default class LogSpy {
  constructor () {
    this.debugCalled = false;
    this.debugMessage = undefined;
    this.errorCalled = false;
    this.errorMessage = undefined;
  }

  debug ( message ) {
    this.debugCalled = true;
    this.debugMessage = message;
  }

  error ( message ) {
    this.errorCalled = true;
    this.errorMessage = message;
  }

  debugCalledWith ( debugMessage ) {
    return this.debugCalled &&
      ( this.debugMessage === debugMessage );
  }

  errorCalledWith ( errorMessage ) {
    return this.errorCalled &&
      ( this.errorMessage === errorMessage );
  }
}
