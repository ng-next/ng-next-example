//noinspection BadExpressionStatementJS
'format es6';

export default function ( ctx, $stateParams, log, movieService ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  return ctx.$q(( resolve, reject ) => {
    movieService.getOne( $stateParams.id )
      .then( movie => {
        resolve( movie );
      })
      .catch( error => {
        log.error( 'Could not load movie.', error );
        reject( error );
      });
  });
}
