//noinspection BadExpressionStatementJS
'format es6';

export default class CtxStub {
  $q ( resolveRejectCallback ) {
    return new Promise(( resolve, reject ) => {
      resolveRejectCallback( resolve, reject );
    });
  }
}
