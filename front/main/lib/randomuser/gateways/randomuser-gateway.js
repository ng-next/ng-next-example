//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'randomuserGateway';

import { registerService } from 'app/core/angular/nn-register-ng-provider';

export default RandomuserGatewayService;

class RandomuserGatewayService {
  constructor( ctx, $http )
  {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.ctx = ctx;
    this.$http = $http;
  }

  getUsers () {
    return this.ctx.$q(( resolve, reject ) => {
      this.$http.get( 'http://api.randomuser.me/?results=10' )
      .then( response => {
        let stripSeed = item => item.user;
        let usersWithoutSeed = response.data.results.map( stripSeed );
        resolve( usersWithoutSeed );
      }).catch( error => reject( error ));
    });
  }
}

registerService( ngName, __moduleName, RandomuserGatewayService );
