//noinspection BadExpressionStatementJS
'format es6';

export default class MovieListStateController {
  constructor ( $log, movieService ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.data = {};

    movieService.getAll()
      .then( movies => {
        this.data = movies;
      })
      .catch( error => {
        $log.error( 'Error retrieving data', error );
      });
  }
}
