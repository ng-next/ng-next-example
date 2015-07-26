// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';
import { LogSpy, LogDummy } from 'test-doubles-log-service';
import { ResolvingMovieServiceSpy, RejectingMovieServiceSpy } from
  '../../services/test-doubles/movie-service-spy.td';
import Controller from './movie-list-state-controller';

describe( 'MovieListStateController', () => {
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

    describe( 'when instantiating', () => {
      beforeEach(() => {
        controller = new Controller( logSpy, rejectingMovieServiceSpy );
      });

      it( 'should log error "Error retrieving data".', done => {
        rejectingMovieServiceSpy.getAll().should.be.rejected
        .then(() => {
          expect( controller.data ).to.deep.equal({});
          expect( logSpy.errorCalledWith(
            'Error retrieving data',
            movieServiceError
          )).to.equal( true, 'must log error' );
        }).should.notify( done );
      });
    });
  });

  describe( 'given a movieService successfully loading data', () => {
    let movieService;
    let logDummy;

    beforeEach(() => {
      logDummy = new LogDummy();
      movieService = new ResolvingMovieServiceSpy();
    });

    describe( 'when instantiating', () => {
      beforeEach(() => {
        controller = new Controller( logDummy, movieService );
      });

      it( 'should get all movies from movie service', done => {
        movieService.getAll().should.be.fulfilled
          .then(() => {
            expect( movieService.getAllCalled ).to.equal( true,
              'must get all movies from movie service' );

            expect( controller.data ).to.equal( movieService.movies,
              'must bind to movies' );
          }).should.notify( done );
      });
    });
  });
});
