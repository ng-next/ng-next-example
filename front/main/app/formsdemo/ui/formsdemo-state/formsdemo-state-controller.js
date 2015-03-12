//noinspection BadExpressionStatementJS
'format es6';

export default class FormsdemoStateController {
  constructor ( log, formsdemoService ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    //this.log = log;
    //this.formsdemoService = formsdemoService;

    this.data = formsdemoService.data;
    log.debug( 'FormsdemoController was instantiated' );

    this.user = {
      name : 'foo user name'
    };
  }
}
