//noinspection BadExpressionStatementJS
'format es6';

let name = 'fileReaderService';

import { registerService } from 'nn-ng-utils';

class FileReaderService {
  constructor ( ctx ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.ctx = ctx;
  }

  readAsDataUrl ( file ) {
    return this.ctx.$q(( resolve, reject ) => {
      var reader = new FileReader(); // jshint ignore:line
      reader.onload = () => {
        resolve( reader.result );
      };
      reader.onerror = () => {
        reject( reader.result );
      };

      reader.readAsDataURL( file );
    });
  }
}

registerService( name, FileReaderService );

export default FileReaderService;
