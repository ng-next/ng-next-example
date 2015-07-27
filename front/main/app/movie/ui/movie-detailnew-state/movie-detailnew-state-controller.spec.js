// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';
import Controller from './movie-detailnew-state-controller';

describe( 'MovieDetailNewStateController', () => {
  let controller;

  it( 'when newed up it should instantiate.', () => {
    controller = new Controller();
    expect( typeof controller ).to.equal( 'object' );
  });
});
