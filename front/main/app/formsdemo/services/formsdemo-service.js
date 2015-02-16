//noinspection BadExpressionStatementJS
'format es6';

let name = 'formsdemoService';

import _ from 'lodash';
import { registerService } from 'nn-ng-utils';

class FormsdemoService {
  constructor ( $log, formsdemoGateway ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.data = {};

    formsdemoGateway.getData()
    .then( response => {
      _.extend( this.data, response );
      if ( this.data.nnDate ) {
        this.data.nnDate = new Date( this.data.nnDate );
      }
      if ( this.data.nnTime ) {
        this.data.nnTime = new Date( this.data.nnTime );
      }
    }).catch( error => {
      $log.error( 'Error retrieving data', error );
    });

    $log.debug( 'FormsdemoService was instantiated' );
  }
}

registerService( name, __moduleName, FormsdemoService );

export default FormsdemoService;
