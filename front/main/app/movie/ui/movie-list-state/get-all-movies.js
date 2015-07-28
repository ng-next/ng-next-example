//noinspection BadExpressionStatementJS
'format es6';

export default function ( ctx, log, movieService ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  return ctx.$q(( resolve, reject ) => {
    movieService.getAll()
      .then( movies => {
        resolve( movies );
      })
      .catch( error => {
        log.error( 'Could not load movies.', error );
        reject( error );
      });
  });
}
