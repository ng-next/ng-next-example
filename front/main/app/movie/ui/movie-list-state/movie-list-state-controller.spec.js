// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';
import Controller from './movie-list-state-controller';

describe.skip( 'MovieListStateController', () => {
  let controller;

  it( 'should instantiate.', () => {
    controller = new Controller();

    expect( typeof controller )
    .to.equal( 'object',
      'must be instantiable' );
  });
});
