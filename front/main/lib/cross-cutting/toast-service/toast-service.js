//noinspection BadExpressionStatementJS
'format es6';

let name = 'toast';

import { registerService } from 'nn-ng-helper';

import CustomToastController from './custom-toast-controller';

class ToastService {
  constructor ( $mdToast, mdToastConfig ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$mdToast = $mdToast;
    this.mdToastConfig = mdToastConfig;
  }

  // TODO: make separate custom toast templates (warning, error, success ...)
  // see material angular docs on how to add make them available the config
  // phase

  debug ( message, title ) {
    this.simple( message, title );
  }

  infoCustom ( message, title ) {
    this.custom( message, title );
  }

  info ( message, title ) {
    this.simple( message, title );
  }

  success ( message, title ) {
    this.simple( message, title );
  }

  warning ( message, title ) {
    this.simple( message, title );
  }

  error ( message, title ) {
    this.simple( message, title );
  }

  simple ( message, title ) {
    if ( typeof title !== 'undefined' ) {
      message = '[' + title + '] ' + message;
    }

    this.$mdToast.show(
      this.$mdToast.simple()
        .content( message )
        .position( this.mdToastConfig.position )
        .hideDelay( this.mdToastConfig.hideDelay )
    );
  }

  // TODO: refactor to individual component
  custom ( message, title ) {
    if ( typeof title !== 'undefined' ) {
      message = '[' + title + '] ' + message;
    }

    var template = '<md-toast>' +
      '<span flex>' + message + '</span>' +
      '<md-button ng-click="customToastController.closeToast()">' +
      'Close</md-button>' +
      '</md-toast>';

    this.$mdToast.show({
      template     : template,
      controller   : CustomToastController,
      controllerAs : 'customToastController',
      position     : this.mdToastConfig.position,
      hideDelay    : this.mdToastConfig.hideDelay,
      //TODO: maybe use JavaScript Object getter function for that!
      parent       : this.mdToastConfig.getParentElement()
    });
  }
}

registerService( name, __moduleName, ToastService );

export default ToastService;
