//noinspection BadExpressionStatementJS
'format es6';

export default class NgnextWelcomeStateController {
  constructor ( log, toast, mdToastConfig ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.log = log;
    this.toast = toast;
    this.mdToastConfig = mdToastConfig;

    this.title = 'Welcome to ng-next';
    this.customParentElementForToasts = mdToastConfig.parentElementName;
  }

  sayHiCustom () {
    this.toast.infoCustom(
      `Hi from ${this.customParentElementForToasts} element !`
    );
  }

  sayHiSimpleAndConsoleLog () {
    this.log.warning( 'Hi from document !' );
  }
}
