// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import getDefaultImage from './get-default-image';
import { ResolvingMovieServiceSpy }
  from '../../services/test-doubles/movie-service-spy.td';
import { CtxStub } from 'test-doubles-angular';

describe( 'getDefaultImage', () => {
  let ctxStub;

  beforeEach(() => {
    ctxStub = new CtxStub();
  });

  describe( 'given a movieService', () => {
    let movieServiceSpy;

    beforeEach(() => {
      movieServiceSpy = new ResolvingMovieServiceSpy();
    });

    it( 'should get the default image from the movieService', done => {
      getDefaultImage( ctxStub, movieServiceSpy ).then(() => {
        expect( movieServiceSpy.getDefaultImageCalled ).to.equal( true,
          'must get default image from movieService' );
        done();
      });
    });
  });
});
