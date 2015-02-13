var $   = require( 'gulp-load-plugins' )({ lazy : true });
var del = require( 'del' );

module.exports = {
  log   : log,
  clean : clean
};

function log ( msg ) {
  if ( typeof msg === 'object' ) {
    for ( var item in msg ) {
      if ( msg.hasOwnProperty( item )) {
        $.util.log( $.util.colors.blue( msg[ item ] ));
      }
    }
  } else {
    $.util.log( $.util.colors.blue( msg ));
  }
}

function clean ( path, done ) {
  log( 'Cleaning: ' + $.util.colors.blue( path ));
  del ( path, done );
}
