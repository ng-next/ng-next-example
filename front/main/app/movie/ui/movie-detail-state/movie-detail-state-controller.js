//noinspection BadExpressionStatementJS
'format es6';

export default class MovieDetailStateController {
  constructor ( ctx, $state, log, movieService, movie ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$state = $state;
    this.log = log;
    this.ctx = ctx;
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

    return this.ctx.$q(( resolve, reject ) => {
      this.movieService[ action ]( movie )
        .then(() => {
          resolve( this.$state.transitionTo( 'root.movie.list' ));
        })
        .catch( error => {
          this.log.error( 'Could not save movie.', error );
          reject( error );
        });
    });
  }
}
