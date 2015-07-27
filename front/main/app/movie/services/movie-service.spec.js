// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';
import Service from './movie-service';

describe( 'MovieService', () => {
  let service;

  it( 'when newed up it should instantiate.', () => {
    service = new Service();
    expect( typeof service ).to.equal( 'object' );
  });
});
