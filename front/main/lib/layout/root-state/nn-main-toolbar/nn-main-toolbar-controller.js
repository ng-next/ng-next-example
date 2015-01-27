//noinspection BadExpressionStatementJS
'format es6';

export default class NnMainToolbarController {
  constructor( $mdSidenav, $state, ctx )
  {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$mdSidenav = $mdSidenav;
    this.$state = $state;
    this.ctx = ctx;

    this.iconBasePath = ctx.cnst.imageSettings.iconBasePath;
  }

  toggleNav () {
    this.$mdSidenav( 'left' ).toggle();
  }

  closeLeftNav () {
    this.$mdSidenav( 'left' ).close();
  }

  goToLogin () {
    this.$state.transitionTo( 'root.authentication.login' );
  }
}
