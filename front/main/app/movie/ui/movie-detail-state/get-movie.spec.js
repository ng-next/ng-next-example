//TODO test ui-state to ensure resolving of movies from movieService and error
// logging (due to controller refactoring)

// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import getMovie from './get-movie';
import { LogSpy, LogDummy } from 'test-doubles-log-service';
import { RejectingMovieServiceSpy, ResolvingMovieServiceSpy }
  from '../../services/test-doubles/movie-service-spy.td';
import { CtxStub } from 'test-doubles-angular';

describe( 'getMovie', () => {
  let ctxStub;

  beforeEach(() => {
    ctxStub = new CtxStub();
  });

  describe( 'given a movieService that rejects with an error', () => {
    let movieServiceError;
    let rejectingMovieServiceSpy;
    let logSpy;
    let stateParamsDummy;

    beforeEach(() => {
      movieServiceError = 'fake webservice is down!';
      rejectingMovieServiceSpy = new RejectingMovieServiceSpy(
        Error( movieServiceError )
      );
      logSpy = new LogSpy();
      stateParamsDummy = { id: null };
    });

    it( 'should log error "Could not load movie."', done => {
      getMovie( ctxStub, stateParamsDummy, logSpy, rejectingMovieServiceSpy )
        .catch(() => {
          expect( logSpy.errorCalledWith( 'Could not load movie.',
            movieServiceError )).to.equal( true, 'must log error' );
          done();
        });
    });
  });

  describe( 'given a movieService', () => {
    let movieServiceSpy;
    let logDummy;
    let stateParamsStub;

    beforeEach(() => {
      logDummy = new LogDummy();
      movieServiceSpy = new ResolvingMovieServiceSpy();
      stateParamsStub = { id: 1 };
    });

    it( 'should get movie from movie service', done => {
      getMovie( ctxStub, stateParamsStub, logDummy, movieServiceSpy )
        .then(() => {
          expect( movieServiceSpy.getOneCalledWith( 1 )).to.equal( true,
            'must get movie from movie service' );
          done();
        });
    });
  });
});
