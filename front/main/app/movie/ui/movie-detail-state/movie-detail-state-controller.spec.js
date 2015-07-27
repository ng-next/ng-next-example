// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';

import Controller from './movie-detail-state-controller';

describe( 'MovieDetailStateController', () => {
  let controller;

  describe( 'given a movie', () => {
    let movie;

    beforeEach(() => {
      movie = { id: 1337 };
      controller = new Controller( movie );
    });

    it( 'should keep a reference to the movie', () => {
      expect( controller.data )
        .to.deep.equal( movie, 'must keep a reference to the movie' );
    });
  });
});
