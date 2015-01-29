// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';
import { LogSpy, LogDummy } from 'test-doubles-log-service';

import Service from './formsdemo-service';

describe( 'FormsdemoService', () => {
  let service;

  describe( 'given logService', () => {
    let logSpy;
    let formsdemoGatewayDummy;

    beforeEach(() => {
      logSpy = new LogSpy();
      formsdemoGatewayDummy = new FormsdemoGatewayDummy();
    });

    describe( 'when instantiating', () => {
      beforeEach(() => {
        service = new Service( logSpy, formsdemoGatewayDummy );
      });

      it( 'should debug-log "FormsdemoService was instantiated".', () => {
        expect( logSpy.debugCalledWith( 'FormsdemoService was instantiated' ))
        .to.equal( true, 'must log debug message' );
      });
    });
  });

  describe( 'given formsdemoGateway that successfully returns data', () => {
    let resolvingFormsdemoGatewayStub;

    beforeEach(() => {
      resolvingFormsdemoGatewayStub = new ResolvingFormsdemoGatewayStub();
    });

    describe( 'when instantiating', () => {
      let logDummy = new LogDummy();

      beforeEach(() => {
        service = new Service( logDummy, resolvingFormsdemoGatewayStub );
      });

      it( 'should get the data from formsdemoGateway.', done => {
        resolvingFormsdemoGatewayStub.resolveGetData()
        .then(() => {
          expect( service.data )
          .to.deep.equal( resolvingFormsdemoGatewayStub.data );
          done();
        });

        // example of chai-as-promised
        //return db.find({ type: 'User' }).should.eventually.have.length(3);
      });
    });
  });

  describe( 'given formsdemoGateway that rejects with an error', () => {
    let rejectingFormsdemoGatewayStub;
    let logSpy;

    beforeEach(() => {
      rejectingFormsdemoGatewayStub = new RejectingFormsdemoGatewayStub();
      logSpy = new LogSpy();
    });

    describe( 'when instantiating', () => {
      beforeEach(() => {
        service = new Service( logSpy, rejectingFormsdemoGatewayStub );
      });

      it( 'should log error "Error retrieving data".', done => {
        rejectingFormsdemoGatewayStub.rejectGetData()
        .then(() => {
          expect( service.data ).to.deep.equal( {} );
          expect( logSpy.errorCalledWith( 'Error retrieving data' ))
          .to.equal( true, 'must log error' );
          done();
        }).catch(() => done() );
      });
    });
  });
  /////////////////////////////////////////////////////////////////////

  class ResolvingFormsdemoGatewayStub {
    constructor () {
      this.data = {
        foo : 'bar'
      };
      this.getDataResolveFunc = undefined;
    }

    getData () {
      return new Promise(( resolve ) => {
        this.getDataResolveFunc = resolve;
      });
    }

    resolveGetData () {
      return Promise.resolve()
      .then( this.getDataResolveFunc( this.data ));
    }
  }

  class RejectingFormsdemoGatewayStub {
    constructor () {
      this.getDataRejectFunc = undefined;
    }

    getData () {
      return new Promise(( resolve, reject ) => {
        this.getDataRejectFunc = reject;
      });
    }

    rejectGetData () {
      return Promise.resolve()
      .then( this.getDataRejectFunc( Error(
        'Formsdemo webservice is down!' )));
    }
  }

  class FormsdemoGatewayDummy {
    constructor () {
    }

    getData () {
      return Promise.resolve({});
    }
  }
});
