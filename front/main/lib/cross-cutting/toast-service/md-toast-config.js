//noinspection BadExpressionStatementJS
'format es6';

export default class MdToastConfig {
  // TODO: refactor to use options object and guard clauses
  constructor ( hideDelay, position, parentElementName ) {
    this.hideDelay = hideDelay;
    this.position = position;
    //TODO make private by using a Symbol
    this.parentElementName = parentElementName;
  }

  getParentElement () {
    return angular.element(
      // TODO: ErrorHandling
      document.getElementsByTagName( this.parentElementName )[ 0 ]
    );
  }
}
