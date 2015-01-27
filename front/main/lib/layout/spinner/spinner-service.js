//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'spinnerService';

// TODO: make alias
import { registerService } from 'app/core/angular/nn-register-ng-provider';

export default SpinnerService;

class SpinnerService {
  constructor () {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.isSpinnerVisible = true;
  }

  start () {
    // TODO: add animation
    this.isSpinnerVisible = true;
  }

  stop () {
    // for testing purposes
    //$timeout( () => {
    //  service.isSpinnerVisible = false;
    //}, 1000 );

    // TODO: add animation
    this.isSpinnerVisible = false;
  }
}

registerService( ngName, __moduleName, SpinnerService );
