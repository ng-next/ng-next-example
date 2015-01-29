//noinspection BadExpressionStatementJS
'format es6';

export default class AuthenticationLoginStateController {
  constructor ( log ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.username = '';
    this.password = '';
    this.log = log;

    log.info( 'AuthenticationLoginStateController was instantiated' );
  }

  login () {
    this.log.info( 'Login was clicked' );
  }
}
