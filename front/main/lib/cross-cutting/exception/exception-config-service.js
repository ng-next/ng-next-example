//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'exceptionConfig';

// TODO: make alias
import { registerProvider } from 'app/core/angular/nn-register-ng-provider';

//import MyConfigClass from './exception-config';

export default ExceptionConfigProvider;

const DEFAULT_APP_ERROR_PREFIX = '';

class ExceptionConfigProvider {
  constructor () {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.config = {
      appErrorPrefix : DEFAULT_APP_ERROR_PREFIX
    }; // or use "new MyConfigClass( APP_ERROR_PREFIX, option2 ...);"
  }

  $get () {
    return this.config;
  }

  setAppErrorPrefix ( value ) {
    //ToDo TDD a guard clause to be of type 'string'
    this.config.appErrorPrefix = value;
  }
}

registerProvider( ngName, __moduleName, ExceptionConfigProvider );
