//noinspection BadExpressionStatementJS
'format es6';

let name = 'randomuserGateway';

import { registerService } from 'nn-ng-utils';

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

registerService( name, __moduleName, RandomuserGatewayService );

export default RandomuserGatewayService;
