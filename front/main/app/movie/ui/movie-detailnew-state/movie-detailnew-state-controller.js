//noinspection BadExpressionStatementJS
'format es6';

export default class MovieDetailnewStateController {
  constructor ( log, movieService ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.log = log;
    this.movieService = movieService;
  }

  createMovie ( newMovie ) {
    this.movieService.createMovie( newMovie )
      .then( movie => {
        return movie;
      })
      .catch( error => {
        this.log.error( 'Error saving the new movie.', error );
      });
  }
}
