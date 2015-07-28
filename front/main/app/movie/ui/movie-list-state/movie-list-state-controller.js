//noinspection BadExpressionStatementJS
'format es6';

export default class MovieListStateController {
  constructor ( ctx, log, movieService, movies ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.ctx = ctx;
    this.log = log;
    this.movieService = movieService;
    this.data = movies;
  }

  deleteMovie ( movie ) {
    return this.ctx.$q(( resolve, reject ) => {
      this.movieService.deleteMovie( movie )
        .then( deletedMovie => {
          let deletedMovieIndex = this.data.indexOf( movie );
          if ( deletedMovieIndex > -1 ) {
            this.data.splice( deletedMovieIndex, 1 );
          }
          resolve( deletedMovie );
        })
        .catch( error => {
          this.log.error( 'Could not delete movie.', error );
          reject( error );
        });
    });
  }
}
