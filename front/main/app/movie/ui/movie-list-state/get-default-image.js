//noinspection BadExpressionStatementJS
'format es6';

export default function ( ctx, movieService ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  return ctx.$q(( resolve ) => {
    movieService.getDefaultImage()
      .then( defaultImage => resolve( defaultImage ));
  });
}
