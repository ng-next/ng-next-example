//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'formsdemoService';

import _ from 'lodash';

// TODO: make alias
import { registerService } from 'app/core/angular/nn-register-ng-provider';

class FormsdemoService {
  // @ngInject
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
      $log.error( 'foo', error );
    });

    $log.debug( 'FormsdemoService was instantiated' );
  }
}

registerService( ngName, __moduleName, FormsdemoService );

export default FormsdemoService;
