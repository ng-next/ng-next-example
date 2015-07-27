//noinspection BadExpressionStatementJS
'format es6';

export default class MovieDetailnewStateController {
  constructor ( $state, log, movieService ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$state = $state;
    this.log = log;
    this.movieService = movieService;
  }

  createMovie ( newMovie ) {
    this.movieService.createMovie( newMovie )
      .then(() => {
        this.$state.transitionTo( 'root.movie.list' );
      })
      .catch( error => {
        this.log.error( 'Error saving the new movie.', error );
      });
  }
}
