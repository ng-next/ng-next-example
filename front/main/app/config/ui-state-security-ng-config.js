//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';

function configureUiStateSecurity ( $rootScope, $state, authService, cnst ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  $rootScope.$on( cnst.events.stateChangeStart, ( event, toState ) => {
    if ( unknownUserGoesToPrivateState() ) {
      goTo( 'root.user.login' );
    }

    if ( loggedInUserGoesToStateForUnknownUser() ) {
      goTo( '??????????????????' );
    }

    function unknownUserGoesToPrivateState () {
      return toState.data.requiresAuthentication &&
        Boolean( authService.userIsNotLoggedIn() );
    }

    function loggedInUserGoesToStateForUnknownUser () {
      return authService.userIsLoggedIn() && toStateIsOnlyForUnknownUser();

      function toStateIsOnlyForUnknownUser () {
        return toState.name === 'root.user.login' ||
               toState.name === 'root.user.signup' ||
               toState.name === 'root.user.signuptoken';
      }
    }

    function goTo ( targetState ) {
      $state.transitionTo( targetState );
      event.preventDefault();
    }
  });
}

nnNgConfigurations.registerForRunPhase( configureUiStateSecurity );
