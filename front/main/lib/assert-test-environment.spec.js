/* global sinon, describe, it, expect, beforeEach, afterEach, inject */
/* jshint -W030 */
/* jshint -W098 */
// jscs:disable disallowAnonymousFunctions
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';

import { StateDummy } from 'test-doubles-angular';

describe( 'test environment', () => {
  it( 'should be available.', () => {
    let a = new StateDummy();
    let b = new StateDummy();

    expect( a ).to.deep.equal( b );
  } );
});
