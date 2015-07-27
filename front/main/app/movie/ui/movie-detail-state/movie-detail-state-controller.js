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

  isCreateMode () {
    return !this.data.id;
  }

  saveMovie ( movie ) {
    let action;

    if ( this.isCreateMode() ) {
      action = 'createMovie';
    } else {
      action = 'updateMovie';
    }

    this.movieService[ action ]( movie )
      .then(() => {
        this.$state.transitionTo( 'root.movie.list' );
      })
      .catch( error => {
        this.log.error( 'Error saving the movie.', error );
      });
  }
}
