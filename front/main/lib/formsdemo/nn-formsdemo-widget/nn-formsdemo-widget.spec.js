// jscs:disable disallowAnonymousFunctions
//noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';

import { StateDummy } from 'test-doubles-angular';

import directiveNgModuleName from './nn-formsdemo-widget';

describe( 'nn-formsdemo-widget', () => {
  let $compile;
  let $rootScope;
  let scope;
  let element;

  beforeEach( () => {
    angular.mock.module( directiveNgModuleName );
    registerStateProviderDummyForImplicitlyCreatedController();
  } );

  beforeEach( angular.mock.inject( ( $injector ) => {
    setupAngularDependencies( $injector );
  } ) );

  describe( 'Given something', () => {
    beforeEach( () => {
      scope = $rootScope.$new();
      scope.something = { some: 'thing' };
    });

    describe( 'when compiled', () => {
      beforeEach( () => {
        let html = '<foo></foo>'
        compileDirective( html );
      });

      it( 'should display some thing', () => {
        let el = element.find( 'md-whiteframe' );

        expect( el.text() ).to.contain( 'thing' );
        //expect( el.length ).to.equal( 2 );
        //expect( el.hasClass( 'nn-bar' ) ).to.equal( true );

        //var contents = element.find( 'h3' ),
        //    firma = angular.element( contents[ 0 ] ),
        //expect( firma.text() ).to.equal( 'Firma' );

        //ng-repeat="item in bogengroup.data | filter:filter as filteredBogenItems"
        //expect( element.isolateScope().filteredBogenItems.length ).to.equal( 0 );
      });
    });
  });

  function registerStateProviderDummyForImplicitlyCreatedController () {
    angular.module( 'stateProvider', [] )
      .factory( '$state', () => {
        return ( () => null );
      }
    );
    module( 'stateProvider' );
  }

  function setupAngularDependencies ( $injector ) {
    $rootScope = $injector.get( '$rootScope' );
    $compile = $injector.get( '$compile' );
  }

  function compileDirective ( string ) {
    element = angular.element( string );
    $compile( element )( scope );
    scope.$apply();
  }
});
