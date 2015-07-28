// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import Controller from './movie-detail-state-controller';
import { LogSpy, LogDummy } from 'test-doubles-log-service';
import { RejectingMovieServiceSpy, ResolvingMovieServiceSpy, MovieServiceDummy }
  from '../../services/test-doubles/movie-service-spy.td';
import { StateDummy, StateSpy, CtxStub, CtxDummy } from 'test-doubles-angular';

describe( 'MovieDetailStateController', () => {
  let controller;
  let stateDummy;
  let logDummy;
  let movieServiceDummy;
  let ctxStub;

  beforeEach(() => {
    stateDummy = new StateDummy();
    logDummy = new LogDummy();
    movieServiceDummy = new MovieServiceDummy();
    ctxStub = new CtxStub();
  });

  describe( 'given a movie', () => {
    let movie;

    beforeEach(() => {
      movie = { id: 1337 };
    });

    describe( 'when instatiating', () => {
      let ctxDummy;

      beforeEach(() => {
        ctxDummy = new CtxDummy();
        controller = new Controller( ctxDummy, stateDummy, logDummy,
          movieServiceDummy, movie );
      });

      it( 'should keep a reference to the movie', () => {
        expect( controller.data )
          .to.deep.equal( movie, 'must keep a reference to the movie' );
      });

      it( 'should not be in create mode', () => {
        expect( controller.isCreateMode() )
          .to.equal( false, 'must not be in create mode' );
      });
    });

    describe( 'and given a movieService that rejects with an error', () => {
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

      describe( 'when calling saveMovie()', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateDummy, logSpy,
            rejectingMovieServiceSpy, movie );

          controller.saveMovie( movie ).catch(() => {
            done();
          });
        });

        it( 'should log error "Could not save movie."', () => {
          expect( logSpy.errorCalledWith( 'Could not save movie.',
            movieServiceError )).to.equal( true, 'must log error' );
        });
      });
    });

    describe( 'and given a non-failing movieService', () => {
      let resolvingMovieServiceSpy;

      beforeEach(() => {
        resolvingMovieServiceSpy = new ResolvingMovieServiceSpy();
      });

      describe( 'when calling saveMovie() with an existing movie', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateDummy, logDummy,
            resolvingMovieServiceSpy, movie );

          controller.saveMovie( movie ).then(() => {
            done();
          });
        });

        it( 'should call movieService update() with the movie', () => {
          expect( resolvingMovieServiceSpy.updateMovieCalledWith( movie ))
            .to.equal( true, 'movieService.createMovie() must be called' +
            ' with the existing movie' );
        });
      });
    });

    describe( 'and given a stateProvider', () => {
      let stateSpy;
      beforeEach(() => {
        stateSpy = new StateSpy();
      });

      describe( 'when calling saveMovie()', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateSpy, logDummy,
            movieServiceDummy, movie );

          controller.saveMovie( movie ).then(() => {
            done();
          });
        });

        it( 'should navigate to the movie list afterwrards.', () => {
          const stateName = 'root.movie.list';

          expect( stateSpy.transitionTo.CalledWith( stateName )).to.equal(
            true, 'state.transitionTo must be called with ' + stateName );
        });
      });
    });
  });

  describe( 'given no existing movie', () => {
    let movie;

    beforeEach(() => {
      movie = {};
    });

    describe( 'when instatiating', () => {
      beforeEach(() => {
        controller = new Controller( ctxStub, stateDummy, logDummy,
          movieServiceDummy, movie );
      });

      it( 'should be in create mode', () => {
        expect( controller.isCreateMode() )
          .to.equal( true, 'must not be in create mode' );
      });
    });

    describe( 'and given a movieService that rejects with an error', () => {
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

      describe( 'when calling saveMovie() with a new movie', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateDummy, logSpy,
            rejectingMovieServiceSpy, movie );

          controller.saveMovie( movie ).catch(() => {
            done();
          });
        });

        it( 'should log error "Could not save movie."', () => {
          expect( logSpy.errorCalledWith( 'Could not save movie.',
            movieServiceError )).to.equal( true, 'must log error' );
        });
      });
    });

    describe( 'and given a non-failing movieService', () => {
      let resolvingMovieServiceSpy;

      beforeEach(() => {
        resolvingMovieServiceSpy = new ResolvingMovieServiceSpy();
      });

      describe( 'when calling saveMovie() with a new movie', () => {
        let newMovie;

        beforeEach( done => {
          newMovie = { title: 'foo' };
          controller = new Controller( ctxStub, stateDummy, logDummy,
            resolvingMovieServiceSpy, movie );

          controller.saveMovie( newMovie ).then(() => {
            done();
          });
        });

        it( 'should call movieService create() with the newMovie', () => {
          expect( resolvingMovieServiceSpy.createMovieCalledWith( newMovie ))
            .to.equal( true, 'movieService.createMovie() must be called' +
            ' with the correct newMovie' );
        });
      });
    });

    describe( 'and given a stateProvider', () => {
      let stateSpy;

      beforeEach(() => {
        stateSpy = new StateSpy();
      });

      describe( 'when calling saveMovie()', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateSpy, logDummy,
            movieServiceDummy, movie );

          controller.saveMovie().then(() => {
            done();
          });
        });

        it( 'should navigate to the movie list afterwrards.', () => {
          const stateName = 'root.movie.list';

          expect( stateSpy.transitionTo.CalledWith( stateName )).to.equal(
            true, 'state.transitionTo must be called with ' + stateName );
        });
      });
    });
  });
});
