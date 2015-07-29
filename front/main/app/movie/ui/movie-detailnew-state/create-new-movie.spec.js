// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import createNewMovie from './create-new-movie';

describe( 'createNewMovie', () => {
  it( 'should create a new movie with an empty images collection', () => {
    let expectedNewMovie = { images : [] };

    expect( createNewMovie() ).to.deep.equal( expectedNewMovie,
      'new movie must contain empty image collection' );
  });
});
