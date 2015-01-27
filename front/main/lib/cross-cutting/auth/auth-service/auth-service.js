//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'authService';

// TODO: make alias
import { registerService } from 'app/core/angular/nn-register-ng-provider';

export default AuthService;

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

registerService( ngName, __moduleName, AuthService );
