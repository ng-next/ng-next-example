//noinspection BadExpressionStatementJS
'format es6';

export default class MovieListStateController {
  constructor ( $state, $log, movieService ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.state = $state;
    this.data = {};

    movieService.getAll()
      .then( movies => {
        this.data = movies;
      })
      .catch( error => {
        $log.error( 'Error retrieving data', error );
      });
  }

  createNewMovie () {
    this.state.transitionTo( 'root.movie.detailnew' );
  }
}
