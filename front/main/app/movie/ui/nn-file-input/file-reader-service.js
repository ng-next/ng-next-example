//noinspection BadExpressionStatementJS
'format es6';

let name = 'fileReaderService';

import { registerService } from 'nn-ng-utils';

class FileReaderService {
  constructor ( $q ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$q = $q;
  }

  readAsDataUrl ( file, scope ) {
    let deferred = this.$q.defer();
    let reader = getReader( deferred, scope );

    reader.readAsDataURL( file );
    return deferred.promise;
  }
}

function onLoad ( reader, deferred, scope ) {
  return function () {
    scope.$apply( function () {
      deferred.resolve( reader.result );
    } );
  };
}

function onError ( reader, deferred, scope ) {
  return function () {
    scope.$apply( function () {
      deferred.reject( reader.result );
    } );
  };
}

function onProgress ( scope ) {
  return function ( event ) {
    scope.$broadcast( 'fileReadProgress',
      {
        total  : event.total,
        loaded : event.loaded
      } );
  };
}

function getReader ( deferred, scope ) {
  var reader = new FileReader(); // jshint ignore:line
  reader.onload = onLoad( reader, deferred, scope );
  reader.onerror = onError( reader, deferred, scope );
  reader.onprogress = onProgress( scope );
  return reader;
}

registerService( name, __moduleName, FileReaderService );

export default FileReaderService;
