// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';
import Controller from './movie-detailnew-state-controller';
import { LogSpy } from 'test-doubles-log-service';
import { RejectingMovieServiceSpy }
  from '../../services/test-doubles/movie-service-spy.td';

describe( 'MovieDetailNewStateController', () => {
  let controller;

  describe( 'given a movieService that rejects with an error', () => {
    let movieServiceError;
    let rejectingMovieServiceSpy;
    let logSpy;

    beforeEach(() => {
      movieServiceError = 'fake webservice is down!';
      rejectingMovieServiceSpy = new RejectingMovieServiceSpy(
        Error( movieServiceError )
      );
      logSpy = new LogSpy();
    });

    describe( 'when calling create() with a new movie', () => {
      let newMovie;

      beforeEach(() => {
        controller = new Controller( logSpy, rejectingMovieServiceSpy );
        newMovie = { title: 'foo' };

        controller.createMovie( newMovie );
      });

      it( 'should log error "Error saving the new movie."', done => {
        rejectingMovieServiceSpy.createMovie().should.be.rejected
        .then(() => {
          expect( logSpy.errorCalledWith(
            'Error saving the new movie.',
            movieServiceError
          )).to.equal( true, 'must log error' );
        }).should.notify( done );
      });
    });
  });
});
