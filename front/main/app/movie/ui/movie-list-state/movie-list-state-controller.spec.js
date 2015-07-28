// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import Controller from './movie-list-state-controller';
import { LogSpy, LogDummy } from 'test-doubles-log-service';
import {
  ResolvingMovieServiceSpy,
  MovieServiceDummy,
  ResolvingRealtimeMovieServiceStub,
  RejectingMovieServiceSpy
} from '../../services/test-doubles/movie-service-spy.td';
import { CtxStub, CtxDummy } from 'test-doubles-angular';
import _ from 'lodash';

describe( 'MovieListStateController', () => {
  let controller;

  describe( 'given a movie collection', () => {
    let movies;
    let logDummy;
    let movieServiceDummy;
    let ctxStub;

    beforeEach(() => {
      movies = [ { id : 1, title : 'foo' }, { id : 2, title : 'bar' } ];
      logDummy = new LogDummy();
      movieServiceDummy = new MovieServiceDummy();
      ctxStub = new CtxStub();
    });

    describe( 'when instantiating', () => {
      let ctxDummy;

      beforeEach(() => {
        ctxDummy = new CtxDummy();

        controller = new Controller( ctxDummy, logDummy, movieServiceDummy,
          movies );
      });

      it( 'should keep a reference to the movie collection.', () => {
        expect( controller.data ).to.equal( movies, 'must keep reference to' +
          ' movie collection' );
      });
    });

    describe( 'and given a non-failing movieService', () => {
      let movieServiceSpy;

      beforeEach(() => {
        movieServiceSpy = new ResolvingMovieServiceSpy();
      });

      describe( 'when deleting a movie', () => {
        let movieToDelete;
        let movieCount;

        beforeEach( done => {
          movieCount = movies.length;
          movieToDelete = movies[ 0 ];
          controller = new Controller( ctxStub, logDummy, movieServiceSpy,
            movies );

          controller.deleteMovie( movieToDelete ).then(() => {
            done();
          });
        });

        it( 'should call movieService.delete() with the correct movie', () => {
          expect( movieServiceSpy.deleteMovieCalledWith( movieToDelete ))
            .to.equal( true, 'must call movieService.delete() with the' +
              ' correct movie' );
        });

        it( 'should remove the deleted movie from it\'s collection', () => {
          expect( _.find( controller.data, m => m.id === movieToDelete.id ))
            .to.equal( undefined, 'must remove the deleted movie from it\'s' +
            ' collection' );
          expect( controller.data.length ).to.equal( movieCount - 1,
            'must remove exactly 1 item' );
        });
      });
    });

    describe( 'and given a non-failing realtime-data movieService', () => {
      let realtimeMovieServiceStub;

      beforeEach(() => {
        realtimeMovieServiceStub = new ResolvingRealtimeMovieServiceStub(
          movies );
      });

      describe( 'when deleting a movie', () => {
        let movieToDelete;
        let movieCount;

        beforeEach( done => {
          movieCount = movies.length;
          realtimeMovieServiceStub.getAll().then( realtimeMovies => {
            movieToDelete = realtimeMovies[ 0 ];
            controller = new Controller( ctxStub, logDummy,
              realtimeMovieServiceStub, realtimeMovies );

            controller.deleteMovie( movieToDelete ).then(() => {
              done();
            });
          });
        });

        it( 'shouldn\'t remove the deleted movie from it\'s collection', () => {
          expect( _.find( controller.data, m => m.id === movieToDelete.id ))
            .to.equal( undefined, 'must remove the deleted movie from it\'s' +
            ' collection' );
          expect( controller.data.length ).to.equal( movieCount - 1,
            'must remove exactly 1 item' );
        });
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

      describe( 'when deleting a movie', () => {
        beforeEach( done => {
          let movieDummy = {};
          controller = new Controller( ctxStub, logSpy,
            rejectingMovieServiceSpy, movies );

          controller.deleteMovie( movieDummy ).catch(() => {
            done();
          });
        });

        it( 'should log error "Could not delete movie."', () => {
          expect( logSpy.errorCalledWith( 'Could not delete movie.',
            movieServiceError )).to.equal( true, 'must log error' );
        });
      });
    });
  });
});
