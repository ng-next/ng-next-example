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

  displayWarningMessage () {
    this.log.warning(
      `Warning from ${this.customParentElementForToasts} element !`
    );
  }

  displayDebugMessage () {
    this.log.debug( 'Debug message from document (default)' );
    this.toast.info(
      `When in angular debug mode you'll see a debug console.log as well`
    );
  }
}
