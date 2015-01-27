//noinspection BadExpressionStatementJS
'format es6';

export default class NnFormsdemoWidgetController {
  constructor ( formsdemoService ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.data = formsdemoService.data;
  }
}
