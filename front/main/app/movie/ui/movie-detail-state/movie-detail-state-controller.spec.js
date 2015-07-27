// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';
import Controller from './movie-detail-state-controller';
import { LogSpy, LogDummy } from 'test-doubles-log-service';
import { RejectingMovieServiceSpy, ResolvingMovieServiceSpy, MovieServiceDummy }
  from '../../services/test-doubles/movie-service-spy.td';
import { StateDummy, StateSpy } from 'test-doubles-angular';

describe( 'MovieDetailStateController', () => {
  let controller;

  describe( 'given a movie', () => {
    let movie;

    beforeEach(() => {
      movie = { id: 1337 };
    });

    describe( 'when instatiating', () => {
      let stateDummy;
      let logDummy;
      let movieServiceDummy;

      beforeEach(() => {
        stateDummy = new StateDummy();
        logDummy = new LogDummy();
        movieServiceDummy = new MovieServiceDummy();

        controller = new Controller( stateDummy, logDummy, movieServiceDummy,
          movie );
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
      let stateDummy;

      beforeEach(() => {
        movieServiceError = 'fake webservice is down!';
        rejectingMovieServiceSpy = new RejectingMovieServiceSpy(
          Error( movieServiceError )
        );
        logSpy = new LogSpy();
        stateDummy = new StateDummy();
      });

      describe( 'when calling saveMovie() with an existing movie', () => {
        beforeEach(() => {
          controller = new Controller( stateDummy, logSpy,
            rejectingMovieServiceSpy, movie );
          controller.saveMovie( movie );
        });

        it( 'should log error "Error saving the movie."', done => {
          rejectingMovieServiceSpy.updateMovie().should.be.rejected
          .then(() => {
            expect( logSpy.errorCalledWith(
              'Error saving the movie.',
              movieServiceError
            )).to.equal( true, 'must log error' );
          }).should.notify( done );
        });
      });
    });

    describe( 'and given a non-failing movieService', () => {
      let resolvingMovieServiceSpy;
      let logDummy;

      beforeEach(() => {
        logDummy = new LogDummy();
        resolvingMovieServiceSpy = new ResolvingMovieServiceSpy();
      });

      describe( 'when calling saveMovie() with an existing movie', () => {
        let stateDummy;

        beforeEach(() => {
          stateDummy = new StateDummy();
          controller = new Controller( stateDummy, logDummy,
            resolvingMovieServiceSpy, movie );

          controller.saveMovie( movie );
        });

        it( 'should call movieService update() with the movie', done => {
          resolvingMovieServiceSpy.updateMovie( movie ).should.be.fulfilled
            .then(() => {
              expect( resolvingMovieServiceSpy
                .updateMovieCalledWith( movie ))
                .to.equal( true, 'movieService.createMovie() must be called' +
                ' with the existing movie' );
            }).should.notify( done );
        });
      });
    });

    describe( 'and given a stateProvider', () => {
      let stateSpy;
      let logDummy;
      let movieServiceDummy;

      beforeEach(() => {
        stateSpy = new StateSpy();
        logDummy = new LogDummy();
        movieServiceDummy = new MovieServiceDummy();
      });

      describe( 'when calling saveMovie()', () => {
        beforeEach(() => {
          controller = new Controller( stateSpy, logDummy, movieServiceDummy,
            movie );
          controller.saveMovie();
        });

        it( 'should navigate to the movie list afterwrards.', done => {
          const stateName = 'root.movie.list';

          movieServiceDummy.updateMovie().should.be.fulfilled
            .then(() => {
              expect( stateSpy.transitionTo.CalledWith( stateName )).to.equal(
                true, 'state.transitionTo must be called with ' + stateName );
            }).should.notify( done );
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
      let stateDummy;
      let logDummy;
      let movieServiceDummy;

      beforeEach(() => {
        stateDummy = new StateDummy();
        logDummy = new LogDummy();
        movieServiceDummy = new MovieServiceDummy();

        controller = new Controller( stateDummy, logDummy, movieServiceDummy,
          movie );
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
      let stateDummy;

      beforeEach(() => {
        movieServiceError = 'fake webservice is down!';
        rejectingMovieServiceSpy = new RejectingMovieServiceSpy(
          Error( movieServiceError )
        );
        logSpy = new LogSpy();
        stateDummy = new StateDummy();
      });

      describe( 'when calling saveMovie() with a new movie', () => {
        beforeEach(() => {
          controller = new Controller( stateDummy, logSpy,
            rejectingMovieServiceSpy, movie );
          controller.saveMovie( movie );
        });

        it( 'should log error "Error saving the movie."', done => {
          rejectingMovieServiceSpy.createMovie().should.be.rejected
          .then(() => {
            expect( logSpy.errorCalledWith(
              'Error saving the movie.',
              movieServiceError
            )).to.equal( true, 'must log error' );
          }).should.notify( done );
        });
      });
    });

    describe( 'and given a non-failing movieService', () => {
      let resolvingMovieServiceSpy;
      let logDummy;

      beforeEach(() => {
        logDummy = new LogDummy();
        resolvingMovieServiceSpy = new ResolvingMovieServiceSpy();
      });

      describe( 'when calling saveMovie() with a new movie', () => {
        let stateDummy;
        let newMovie;

        beforeEach(() => {
          stateDummy = new StateDummy();
          controller = new Controller( stateDummy, logDummy,
            resolvingMovieServiceSpy, movie );
          newMovie = { title: 'foo' };

          controller.saveMovie( newMovie );
        });

        it( 'should call movieService create() with the newMovie', done => {
          resolvingMovieServiceSpy.createMovie( newMovie ).should.be.fulfilled
            .then(() => {
              expect( resolvingMovieServiceSpy
                .createMovieCalledWith( newMovie ))
                .to.equal( true, 'movieService.createMovie() must be called' +
                ' with the correct newMovie' );
            }).should.notify( done );
        });
      });
    });

    describe( 'and given a stateProvider', () => {
      let stateSpy;
      let logDummy;
      let movieServiceDummy;

      beforeEach(() => {
        stateSpy = new StateSpy();
        logDummy = new LogDummy();
        movieServiceDummy = new MovieServiceDummy();
      });

      describe( 'when calling saveMovie()', () => {
        beforeEach(() => {
          controller = new Controller( stateSpy, logDummy, movieServiceDummy,
            movie );
          controller.saveMovie();
        });

        it( 'should navigate to the movie list afterwrards.', done => {
          const stateName = 'root.movie.list';

          movieServiceDummy.createMovie().should.be.fulfilled
            .then(() => {
              expect( stateSpy.transitionTo.CalledWith( stateName )).to.equal(
                true, 'state.transitionTo must be called with ' + stateName );
            }).should.notify( done );
        });
      });
    });
  });
});
