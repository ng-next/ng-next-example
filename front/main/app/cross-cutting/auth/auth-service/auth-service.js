//noinspection BadExpressionStatementJS
'format es6';

let name = 'authService';

import { registerService } from 'nn-ng-utils';

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

registerService( name, AuthService );

export default AuthService;
