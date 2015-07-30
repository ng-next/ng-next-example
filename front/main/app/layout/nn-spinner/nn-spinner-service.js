//noinspection BadExpressionStatementJS
'format es6';

let name = 'spinnerService';

import { registerService } from 'nn-ng-utils';

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

registerService( name, SpinnerService );

export default SpinnerService;
