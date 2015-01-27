//noinspection BadExpressionStatementJS
'format es6';

export default class AuthenticationLoginStateController {
  constructor ( log ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.username = '';
    this.password = '';

    log.info( 'AuthenticationLoginStateController was instantiated' );
  }

  login () {
    // login logic
  }
}
