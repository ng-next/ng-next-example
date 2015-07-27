// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';
import { LogSpy, LogDummy } from 'test-doubles-log-service';
import { ResolvingMovieServiceSpy, RejectingMovieServiceSpy, MovieServiceDummy }
  from '../../services/test-doubles/movie-service-spy.td';
import { StateDummy, StateSpy } from 'test-doubles-angular';
import Controller from './movie-list-state-controller';

describe( 'MovieListStateController', () => {
  let controller;

  describe( 'given a movieService that rejects with an error', () => {
    let movieServiceError;
    let rejectingMovieServiceSpy;
    let logSpy;
    let stateDummy;

    beforeEach(() => {
      movieServiceError = 'fake webservice is down!';
      rejectingMovieServiceSpy = new RejectingMovieServiceSpy(
        Error( movieServiceError )
      );
      logSpy = new LogSpy();
      stateDummy = new StateDummy();
    });

    describe( 'when instantiating', () => {
      beforeEach(() => {
        controller = new Controller( stateDummy, logSpy,
          rejectingMovieServiceSpy );
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
    let stateDummy;

    beforeEach(() => {
      logDummy = new LogDummy();
      stateDummy = new StateDummy();
      movieService = new ResolvingMovieServiceSpy();
    });

    describe( 'when instantiating', () => {
      beforeEach(() => {
        controller = new Controller( stateDummy, logDummy, movieService );
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

  describe( 'given the stateProvider', () => {
    let stateSpy;
    let movieServiceDummy;
    let logDummy;

    beforeEach(() => {
      stateSpy = new StateSpy();
      logDummy = new LogDummy();
      movieServiceDummy = new MovieServiceDummy();
    });

    describe( 'when createNewMovie() is called', () => {
      beforeEach(() => {
        controller = new Controller( stateSpy, logDummy, movieServiceDummy );
        controller.createNewMovie();
      });

      it( 'should transition to the correct state.', () => {
        const stateName = 'root.movie.detailnew';

        expect( stateSpy.transitionTo.CalledWith( stateName ))
        .to.equal( true, 'state.transitionTo must be called with' + stateName );
      });
    });

    describe( 'when goToMovie() is called', () => {
      let movie;

      beforeEach(() => {
        controller = new Controller( stateSpy, logDummy, movieServiceDummy );
        movie = {
          id : 1337
        };
        controller.goToMovie( movie );
      });

      it( 'should transition to the correct state.', () => {
        const stateName = 'root.movie.detail';

        expect( stateSpy.transitionTo.CalledWith( stateName, movie ))
        .to.equal( true, 'state.transitionTo must be called with ' + stateName +
          ' ' + JSON.stringify( movie ));
      });
    });
  });
});
