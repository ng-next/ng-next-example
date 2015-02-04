//noinspection BadExpressionStatementJS
'format es6';

let name = 'log';

import { registerService } from 'nn-ng-utils';

class LogService {
  constructor ( $log, cnst, toast ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$log = $log;
    this.toast = toast;
    this.cnst = cnst;

    this.showToasts = true;
    this.log = logStraightToConsoleAndBypassToast();

    function logStraightToConsoleAndBypassToast () {
      return $log.log;
    }
  }

  error ( message, data, title ) {
    this.$log.error( 'Error: ' + message, data );
    this.toast.error( message, title );
  }

  warning ( message, data, title ) {
    this.$log.warn( 'Warning: ' + message, data );
    this.toast.warning( message, title );
  }

  info ( message, data, title ) {
    if ( this.cnst.isDev ) {
      this.$log.info( 'Info: ' + message, data );
    }
    this.toast.info( message, title );
  }

  success ( message, data, title ) {
    if ( this.cnst.isDev ) {
      this.$log.info( 'Success: ' + message, data );
    }
    this.toast.success( message, title );
  }

  debug ( message, data ) {
    if ( typeof data !== 'undefined' ) {
      this.$log.debug( message, data );
    } else {
      this.$log.debug( message );
    }
  }
}

registerService( name, __moduleName, LogService );

export default LogService;
