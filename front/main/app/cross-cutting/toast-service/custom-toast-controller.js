//noinspection BadExpressionStatementJS
'format es6';

export default class CustomToastController {
  constructor ( $mdToast ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$mdToast = $mdToast;

    //$scope.closeToast = function closeToast () {
    //  $mdToast.hide();
    //};
  }

  closeToast () {
    this.$mdToast.hide();
  }
}
