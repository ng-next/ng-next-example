//noinspection BadExpressionStatementJS
'format es6';

let name = 'exceptionConfig';

import { registerProvider } from 'nn-ng-helper';

//import MyConfigClass from './exception-config';

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

registerProvider( name, __moduleName, ExceptionConfigProvider );

export default ExceptionConfigProvider;
