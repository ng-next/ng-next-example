//// jscs:disable disallowAnonymousFunctions
////noinspection BadExpressionStatementJS
'format es6';

import 'angular';
import 'angular-mocks';
import { StateDummy, StateSpy } from 'test-doubles-angular';

import Controller from './nn-menu-content-controller';

describe( 'NnMenuContentController', () => {
  let controller;

  describe( 'given the stateProvider', () => {
    let state;
    let mdSideNav;
    let authService;

    beforeEach(() => {
      state = new StateSpy();
      mdSideNav = mdSideNavDummyFactory;
      authService = new authServiceDummy();
    });

    describe( 'when goToRandomUser() is called', () => {
      beforeEach(() => {
        controller = new Controller( state, mdSideNav, authService );
        controller.goToRandomUser();
      });

      it( 'should go to the correct state.', () => {
        expect( state.transitionTo.CalledWith( 'root.randomuser.list' ))
        .to.equal( true, 'state.transitionTo must be called with' +
          ' "root.randomuser.list"');
      });
    });
  });

  describe( 'given a sideNav', () => {
    let mdSideNavFactory;
    let state;
    let authService;

    beforeEach(() => {
      mdSideNavFactory = createMdSideNavSpyFactory();
      mdSideNavFactory.mdSideNav = new mdSideNavSpy();
      state = new StateDummy();
      authService = new authServiceDummy();
    });

    describe( 'when goToRandomUser() is called', () => {
      beforeEach(() => {
        controller = new Controller( state, mdSideNavFactory, authService );
        controller.goToRandomUser();
      });

      it( 'should close the sidenav', function () {
        expect( mdSideNavFactory.mdSideNav.closeWasCalled ).to.equal( true,
          'mdSideNave.close() must be called');
      } );
    });
  });
});

class authServiceDummy {
}

function mdSideNavDummyFactory () {
  return new mdSideNavDummy()
}

class mdSideNavDummy {
  toggle () {
    return null;
  }

  close () {
    return null;
  }
}

function createMdSideNavSpyFactory () {
  let mdSideNavSpyFactory = function mdSideNavSpyFactory ( id ) {
    let self = mdSideNavSpyFactory;
    self.mdSideNav.id = id;

    return self.mdSideNav;
  };
  return mdSideNavSpyFactory;
}

class mdSideNavSpy {
  constructor () {
    this.id = null;
    this.closeWasCalled = false;
  }

  close () {
    this.closeWasCalled = true;
  }
}
