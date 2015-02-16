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
        resolvingFormsdemoGatewayStub.getData().should.be.fulfilled
          .then(() => {
            expect( service.data )
            .to.deep.equal( resolvingFormsdemoGatewayStub.data );
          }).should.notify( done );
      });
    });
  });

  describe( 'given formsdemoGateway that rejects with an error', () => {
    let gatewayError;
    let rejectingFormsdemoGatewayStub;
    let logSpy;

    beforeEach(() => {
      gatewayError = 'Formsdemo webservice is down!';
      rejectingFormsdemoGatewayStub = new RejectingFormsdemoGatewayStub(
        Error( gatewayError )
      );
      logSpy = new LogSpy();
    });

    describe( 'when instantiating', () => {
      beforeEach(() => {
        service = new Service( logSpy, rejectingFormsdemoGatewayStub );
      });

      it( 'should log error "Error retrieving data".', done => {
        rejectingFormsdemoGatewayStub.getData().should.be.rejected
        .then(() => {
          expect( service.data ).to.deep.equal( {} );
          expect( logSpy.errorCalledWith(
            'Error retrieving data',
            gatewayError
          )).to.equal( true, 'must log error' );
        }).should.notify( done );
      });
    });
  });
  /////////////////////////////////////////////////////////////////////

  // TODO: exlude test sub-folders from bundle (or maybe just all .td.js files)

  class ResolvingFormsdemoGatewayStub {
    constructor () {
      this.data = {
        foo : 'bar'
      };
    }

    getData () {
      return Promise.resolve( this.data );
    }
  }

  class RejectingFormsdemoGatewayStub {
    constructor ( errorToThrow ) {
      this.errorToThrow = errorToThrow;
    }

    getData () {
      return Promise.reject( this.errorToThrow );
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
