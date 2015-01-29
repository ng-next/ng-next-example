//noinspection BadExpressionStatementJS
'format es6';

let name = 'authService';

import { registerService } from 'nn-ng-helper';

class AuthService {
  constructor () {
    //noinspection BadExpressionStatementJS
    'ngInject';
  }

  userIsLoggedIn () {
    //return !!angular.fromJson( $cookies.user );
    return true;
  }

  userIsNotLoggedIn () {
    return !this.userIsLoggedIn();
  }
}

registerService( name, __moduleName, AuthService );

export default AuthService;
