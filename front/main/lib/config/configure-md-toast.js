//noinspection BadExpressionStatementJS
'format es6';

export default ( app ) => {
  app.config( configureMdToast );
};

/* @ngInject */
function configureMdToast ( mdToastConfigProvider ) {
  //noinspection BadExpressionStatementJS
  'ngInject';

  mdToastConfigProvider.setHideDelay( 1500 );
  mdToastConfigProvider.setPosition( 'bottom right' );
  mdToastConfigProvider.setParentElementName ( 'footer' );
}
