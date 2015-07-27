// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';
import Controller from './movie-detailnew-state-controller';
import { LogSpy, LogDummy } from 'test-doubles-log-service';
import { RejectingMovieServiceSpy, ResolvingMovieServiceSpy }
  from '../../services/test-doubles/movie-service-spy.td';
import { StateDummy, StateSpy } from 'test-doubles-angular';

describe( 'MovieDetailNewStateController', () => {
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

    describe( 'when calling create() with a new movie', () => {
      beforeEach(() => {
        controller = new Controller( stateDummy, logSpy,
          rejectingMovieServiceSpy );
        controller.createMovie({});
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

  describe( 'given a non-failing movieService', () => {
    let resolvingMovieService;
    let logDummy;

    beforeEach(() => {
      logDummy = new LogDummy();
      resolvingMovieService = new ResolvingMovieServiceSpy();
    });

    describe( 'when calling create() with a new movie', () => {
      let stateDummy;
      let newMovie;

      beforeEach(() => {
        stateDummy = new StateDummy();
        controller = new Controller( stateDummy, logDummy,
          resolvingMovieService );
        newMovie = { title: 'foo' };

        controller.createMovie( newMovie );
      });

      it( 'should call movieService create() with the newMovie', done => {
        resolvingMovieService.createMovie( newMovie ).should.be.fulfilled
          .then(() => {
            expect( resolvingMovieService.createMovieCalledWith( newMovie ))
              .to.equal( true, 'movieService.createMovie() must be called' +
              ' with the correct newMovie' );
          }).should.notify( done );
      });
    });

    describe( 'and given a stateProvider', () => {
      let stateSpy;

      beforeEach(() => {
        stateSpy = new StateSpy();
      });

      describe( 'when calling createMovie()', () => {
        beforeEach(() => {
          controller = new Controller( stateSpy, logDummy,
            resolvingMovieService );
          controller.createMovie();
        });

        it( 'should navigate to the movie list afterwrards.', done => {
          const stateName = 'root.movie.list';

          resolvingMovieService.createMovie().should.be.fulfilled
            .then(() => {
              expect( stateSpy.transitionTo.CalledWith( stateName )).to.equal(
                true, 'state.transitionTo must be called with ' + stateName );
            }).should.notify( done );
        });
      });
    });
  });
});
