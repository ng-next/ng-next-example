//noinspection BadExpressionStatementJS
'format es6';

export default class LogSpy {
  constructor () {
    this.debugCalled = false;
    this.debugMessage = undefined;
    this.errorCalled = false;
    this.errorMessage = undefined;
    this.errorErrorMessage = undefined;
  }

  debug ( message ) {
    this.debugCalled = true;
    this.debugMessage = message;
  }

  error ( message, error ) {
    this.errorCalled = true;
    this.errorMessage = message;

    if ( error && error.message ) {
      this.errorErrorMessage = error.message;
    }
  }

  debugCalledWith ( debugMessage ) {
    return this.debugCalled &&
      ( this.debugMessage === debugMessage );
  }

  errorCalledWith ( message, errorMessage ) {
    let result = this.errorCalled &&
      ( this.errorMessage === message );

    if ( errorMessage ) {
      result = result && ( this.errorErrorMessage === errorMessage );
    }

    return result;
  }
}
