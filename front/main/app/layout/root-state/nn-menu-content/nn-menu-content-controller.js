//noinspection BadExpressionStatementJS
'format es6';

export default class NnMenuContentController {
  constructor( $state, $mdSidenav, authService ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$state = $state;
    this.$mdSidenav = $mdSidenav;
    this.authService = authService;
  }

  toggleNav () {
    this.$mdSidenav( 'left' ).toggle();
  }

  closeLeftNav () {
    this.$mdSidenav( 'left' ).close();
  }

  goToNgNext () {
    this.closeLeftNav();
    this.$state.transitionTo( 'root.ngnext' );
  }

  goToRandomUser () {
    this.closeLeftNav();
    this.$state.transitionTo( 'root.randomuser.list' );
  }

  goToFormsDemo () {
    this.closeLeftNav();
    this.$state.transitionTo( 'root.formsdemo' );
  }

  goToRedditPerfectloops () {
    this.closeLeftNav();
    this.$state.transitionTo( 'root.reddit.perfectloops' );
  }

  goToMovieList () {
    this.closeLeftNav();
    this.$state.transitionTo( 'root.movie.list' );
  }

  userIsLoggedIn () {
    return this.authService.userIsLoggedIn();
  }

  userIsNotLoggedIn () {
    return this.authService.userIsNotLoggedIn();
  }

  logout () {
    this.authService.logout().then( function () {
      this.$state.transitionTo( 'root.user.login' );
      this.closeLeftNav();
    }, function ( error ) {
      // TODO give user feedback in the UI.
      // Implement custom error handler using mdToast.
      console.log( error );
    });
  }
}
