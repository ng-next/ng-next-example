//noinspection BadExpressionStatementJS
'format es6';

let name = 'log';

import { registerService } from 'nn-ng-helper';

class LogService {
  constructor ( $log, toast ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$log = $log;
    this.toast = toast;

    this.showToasts = true;
    this.log = logStraightToConsoleAndBypassToast();

    function logStraightToConsoleAndBypassToast () {
      return $log.log;
    }
  }

  debug ( message, data, title ) {
    this.toast.info( message, title );
    this.$log.info( 'Debug: ' + message, data );
  }

  error ( message, data, title ) {
    this.toast.error( message, title );
    this.$log.error( 'Error: ' + message, data );
  }

  warning ( message, data, title ) {
    this.toast.warning( message, title );
    this.$log.warn( 'Warning: ' + message, data );
  }

  success ( message, data, title ) {
    this.toast.success( message, title );
    this.$log.info( 'Success: ' + message, data );
  }

  info ( message, data, title ) {
    this.toast.info( message, title );
    this.$log.info( 'Info: ' + message, data );
  }
}

registerService( name, __moduleName, LogService );

export default LogService;
