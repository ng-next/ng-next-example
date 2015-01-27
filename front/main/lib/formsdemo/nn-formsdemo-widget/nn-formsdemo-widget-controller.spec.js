//describe( 'il-bogengroup-controller', () => {
//  var $controllerFactory,
//      $q,
//      $rootscope,
//      scope,
//      bogenGroupStub,
//      bogenListItem,
//      bogenGateway,
//      state,
//      consoleLogSpy;
//
//  beforeEach( inject(( $injector ) => {
//    setupAngularDependencies( $injector );
//    setupScope();
//
//    bogenGroupStub = {
//      id   : '2014-12-05',
//      data : [
//        { anrede : 'A', vorname : 'A', created : '2014-12-05T14:02:40.337Z', _id : '1' },
//        { anrede : 'B', vorname : 'B', created : '2014-12-04T14:02:40.337Z', _id : '2' }
//      ]
//    };
//  }));
//
//  describe( 'when navigating to a bogenListItem', () => {
//    beforeEach( () => {
//      bogenListItem = bogenGroupStub.data[0];
//      bogenGateway = new BogenGatewayDummy();
//      state = new StateSpy();
//      setupController( scope, state, bogenGateway );
//
//      scope.goToDetailState( bogenListItem );
//    });
//
//    it( 'should transition to the bogenListItem\'s detail state', () => {
//      expect( state.toState ).to.equal( 'root.bogen.detail' );
//      expect( state.toStateParams.bogenId ).to.equal( bogenListItem._id );
//    });
//  });
//
//  describe( 'given a bogengroup scope property', () => {
//    var originalLength;
//
//    beforeEach( () => {
//      scope.bogengroup = bogenGroupStub;
//      bogenListItem = scope.bogengroup.data[0];
//    });
//
//    describe( 'and a bogenGateway', () => {
//      beforeEach( () => {
//        state = new StateDummy();
//        bogenGateway = new BogenGatewaySpy();
//        setupController( scope, state, bogenGateway );
//      });
//
//      describe( 'when a bogenListItem gets deleted', () => {
//        beforeEach( () => {
//          deleteBogenListItem( scope, bogenListItem );
//        });
//
//        it( 'should call delete from the bogen-gateway for the correct bogenListItem', () => {
//          expect( bogenGateway.deleteBogen.calledOnce() ).to.equal( true );
//          expect( bogenGateway.bogenIdToDelete ).to.equal( bogenListItem._id,
//          'bogenGateway.deleteBogen() must be called with bogenItem.Id' );
//        });
//      });
//    });
//
//    describe( 'and a successfully deleting bogenGateway', () => {
//      beforeEach( () => {
//        state = new StateDummy();
//        bogenGateway = new ResolvingBogenGatewayStub();
//        setupController( scope, state, bogenGateway );
//      });
//
//      describe( 'when a bogenListItem gets deleted', () => {
//        beforeEach( () => {
//          originalLength = scope.bogengroup.data.length;
//
//          deleteBogenListItem( scope, bogenListItem );
//        });
//
//        it( 'should remove bogenListItem from bogenGroup', () => {
//          expect( scope.bogengroup.data.length ).to.equal( originalLength - 1 );
//          expect( scope.bogengroup.data.find( x => ( x._id === bogenListItem._id )))
//            .to.equal( undefined, 'the wrong bogenListItem or no bogenListItem was removed' );
//        });
//      });
//    });
//
//    describe( 'and an erroneous deleting bogenGateway', () => {
//      beforeEach(  () => {
//        state = new StateDummy();
//        bogenGateway = new RejectingBogenGatewayStub();
//        setupController( scope, state, bogenGateway );
//      });
//
//      describe( 'when a bogenListItem gets deleted', () => {
//        beforeEach( () => {
//          consoleLogSpy = sinon.spy( console, 'log' );
//          originalLength = scope.bogengroup.data.length;
//
//          deleteBogenListItem( scope, bogenListItem );
//        });
//
//        it( 'should log an error and not remove bogenListItem from bogenGroup', () => {
//          expect( scope.bogengroup.data.length ).to.equal( originalLength );
//          expect( consoleLogSpy.calledWith( 'Error deleting Bogen: Error deleting bogen' ) ).to.equal( true );
//        } );
//      });
//
//      afterEach( () => console.log.restore() );
//    });
//  });
//
//
//  class BogenGatewayDummy {
//    deleteBogen () {
//      return null;
//    }
//  }
//
//  class BogenGatewaySpy {
//    constructor () {
//      this.deleteBogenCallCount = 0;
//      this.deleteBogen.calledOnce = () => ( this.deleteBogenCallCount === 1 );
//    }
//    deleteBogen ( bogenId ) {
//      this.bogenIdToDelete = bogenId;
//      this.deleteBogenCallCount += 1;
//
//      return new Promise();
//    }
//  }
//
//  class ResolvingBogenGatewayStub {
//    deleteBogen () {
//      var deferred = $q.defer();
//      deferred.resolve( true );
//      return deferred.promise;
//    }
//  }
//
//  class RejectingBogenGatewayStub {
//    deleteBogen () {
//      var deferred = $q.defer();
//      deferred.reject( new Error( 'Error deleting bogen' ) );
//      return deferred.promise;
//    }
//  }
//
//  var deleteBogenListItem = ( scope, bogenListItem ) => {
//    scope.deleteItem( bogenListItem );
//    scope.$digest();
//  };
//});
