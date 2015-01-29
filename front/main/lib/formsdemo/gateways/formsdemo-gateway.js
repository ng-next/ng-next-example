//noinspection BadExpressionStatementJS
'format es6';

let name = 'formsdemoGateway';

import _ from 'lodash';
import { registerService } from 'nn-ng-helper';

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

registerService( name, __moduleName, FormsdemoGatewayService );

export default FormsdemoGatewayService;
