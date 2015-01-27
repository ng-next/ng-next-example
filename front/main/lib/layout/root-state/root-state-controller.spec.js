///* jshint -W030 */
///* jshint -W098 */
//// jscs:disable disallowAnonymousFunctions
////noinspection BadExpressionStatementJS
//'format es6';
//
//import 'angular';
//import 'angular-mocks';
//
//import { controller as controllerFunction } from './root-state-controller';
//
//describe( 'root-state-controller', function () {
//  var scope,
//      $controllerConstructor,
//      $q,
//      $timeout,
//      $materialSidenav,
//      stateSpy,
//      closeLeftNavSpy,
//      closeLeftNavDummy;
//
//  beforeEach( inject( function ( $injector ) {
//    scope = $injector.get( '$rootScope' ).$new();
//    $controllerConstructor = $injector.get( '$controller' );
//    $timeout = $injector.get( '$timeout' );
//    $materialSidenav = undefined; //$injector.get( '$materialSidenav' );
//    $q = $injector.get( '$q' );
//
//    stateSpy = sinon.stub( {
//      transitionTo : function () {
//      }
//    } );
//
//    closeLeftNavSpy = sinon.spy();
//    closeLeftNavDummy = sinon.stub();
//
//    var controller = $controllerConstructor( controllerFunction, {
//      $scope      : scope,
//      $state      : stateSpy,
//      $timeout    : $timeout,
//      $mdSidenav  : $materialSidenav,
//      authService : undefined
//    } );
//  } ) );
//
//  describe( 'when navigateToMesseListState() is called', function () {
//    beforeEach( function () {
//      scope.actions.closeLeftNav = closeLeftNavDummy;
//    } );
//
//    it( 'should navigate to correct state', function () {
//      scope.actions.navigateToMesseListState();
//      //noinspection BadExpressionStatementJS
//      expect( stateSpy.transitionTo.calledWith( 'root.messe.mobilelist' ) ).to.be.true;
//    } );
//
//    describe( 'and', function () {
//      beforeEach( function () {
//        scope.actions.closeLeftNav = closeLeftNavSpy;
//      } );
//
//      it( 'should  close the sidenav', function () {
//        scope.actions.navigateToMesseListState();
//        //noinspection BadExpressionStatementJS
//        sinon.assert.calledOnce( closeLeftNavSpy );
//      } );
//    } );
//  } );
//} );
