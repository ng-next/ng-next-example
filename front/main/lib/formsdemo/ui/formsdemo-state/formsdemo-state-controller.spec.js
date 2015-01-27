// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';

import { LogDummy, LogSpy } from 'test-doubles-log-service';
import { FormsdemoServiceDummy, FormsdemoServiceStub } from
  'test-doubles-formsdemo-service';

import Controller from './formsdemo-state-controller';

describe( 'FormsdemoStateController', () => {
  //let $controllerFactory;
  //let $rootscope;
  let controller;
  //var scope;
  //var state;

  //beforeEach( inject(( $injector ) => {
    //setupAngularDependencies( $injector );
    //setupScope();
  //}));

  describe( 'given formsdemoService with data', () => {
    let formsdemoServiceStub;
    let logDummy;

    beforeEach(() => {
      formsdemoServiceStub = new FormsdemoServiceStub();
      logDummy = new LogDummy();
    });

    describe( 'when instantiating', () => {
      beforeEach( () => {
        controller = new Controller( logDummy, formsdemoServiceStub );
      });

      it( 'should bind data.', () => {
        expect( controller.data )
        .to.equal( formsdemoServiceStub.data,
          'must bind to formsdemoService.data' );
      });
    });
  });

  describe( 'given logService', () => {
    let logSpy;
    let formsdemoServiceDummy;

    beforeEach(() => {
      logSpy = new LogSpy();
      formsdemoServiceDummy = new FormsdemoServiceDummy();
    });

    describe( 'when instantiating', () => {
      beforeEach(() => {
        controller = new Controller( logSpy, formsdemoServiceDummy );
      });

      it( 'should debug-log' +
      ' "FormsdemoController was instantiated"', () => {
        let debugMsg = 'FormsdemoController was instantiated';

        expect( logSpy.debugCalledWith( debugMsg )).to.equal( true,
          'must log debug message' );
      });
    });
  });

  /////////////////////////////////////////////////////////////////////

  //function setupAngularDependencies ( $injector ) {
  //  $rootscope = $injector.get( '$rootScope', 'formsdemo-state-controller' );
  //  $controllerFactory = $injector.get( '$controller', 'formsdemo-state-controller' );
  //}

  //function setupScope () {
  //  scope = $rootscope.$new();
  //}

  // inject more ctrl deps .......↓ here
  //function setupController ( scope ) {
    //$controllerFactory( controllerFunction, {
    //  $scope       : scope,
    //  $state       : state,
    //  bogenGateway : bogenGateway
    //});
  //}
});
