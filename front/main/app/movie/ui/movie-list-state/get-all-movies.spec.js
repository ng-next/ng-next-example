// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import getAllMovies from './get-all-movies';
import { LogSpy, LogDummy } from 'test-doubles-log-service';
import { RejectingMovieServiceSpy, ResolvingMovieServiceSpy }
  from '../../services/test-doubles/movie-service-spy.td';
import { CtxStub } from 'test-doubles-angular';

describe( 'getMovies', () => {
  let ctxStub;

  beforeEach(() => {
    ctxStub = new CtxStub();
  });

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

    it( 'should log error "Could not load movies."', done => {
      getAllMovies( ctxStub, logSpy, rejectingMovieServiceSpy ).catch(() => {
        expect( logSpy.errorCalledWith( 'Could not load movies.',
          movieServiceError )).to.equal( true, 'must log error' );
        done();
      });
    });
  });

  describe( 'given a movieService', () => {
    let movieServiceSpy;
    let logDummy;

    beforeEach(() => {
      logDummy = new LogDummy();
      movieServiceSpy = new ResolvingMovieServiceSpy();
    });

    it( 'should get all movies from movie service', done => {
      getAllMovies( ctxStub, logDummy, movieServiceSpy ).then(() => {
        expect( movieServiceSpy.getAllCalled ).to.equal( true,
          'must get all movies from movie service' );
        done();
      });
    });
  });
});
