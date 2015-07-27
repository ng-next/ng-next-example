//noinspection BadExpressionStatementJS
'format es6';

export default class MovieDetailStateController {
  constructor ( $state, log, movieService, movie ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$state = $state;
    this.log = log;
    this.movieService = movieService;
    this.data = movie;
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
