//noinspection BadExpressionStatementJS
'format es6';

export default class NnSpinnerController {
  constructor ( spinnerService ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.spinnerService = spinnerService;
    this.isSpinnerVisible = () => this.spinnerService.isSpinnerVisible;
  }
}
