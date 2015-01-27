//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'formsdemoGateway';

import _ from 'lodash';

// TODO: make alias
import { registerService } from 'app/core/angular/nn-register-ng-provider';

export default FormsdemoGatewayService;

class FormsdemoGatewayService {
  constructor ( ctx ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.ctx = ctx;
  }

  getData () {
    let data = {
      nnText        : 'ESnext',
      nnDate        : '2014-12-31',
      nnTime        : '1970-01-01T15:30:00Z',
      nnEmail       : 'foo@bar.org',
      nnDescription : 'Description',
      nnNumber      : 13
    };

    //return ctx.$q(( resolve ) => {
    //  resolve( data );
    //});
    return this.ctx.$q.when( _.cloneDeep( data ));
  }
}

registerService( ngName, __moduleName, FormsdemoGatewayService );
