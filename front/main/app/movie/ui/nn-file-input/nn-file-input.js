// jscs:disable disallowAnonymousFunctions
//noinspection BadExpressionStatementJS
'format es6';

let name = 'nnFileInput';

import { registerDirective } from 'nn-ng-utils';

export var ddo = ( $parse ) => {
  //noinspection BadExpressionStatementJS
  'ngInject';

  return {
    restrict : 'E',
    replace  : true,
    template : '<input type="file" />',
    link     : function ( scope, element, attrs ) {
      let modelGet = $parse( attrs.imageData );
      let modelSet = modelGet.assign;
      let onChange = $parse( attrs.onChange );
      let updateModel;

      updateModel = function () {
        scope.$apply( function () {
          modelSet( scope, element[ 0 ].files[ 0 ] );
          onChange( scope );
        } );
      };

      element.bind( 'change', updateModel );
    }
  };
};

registerDirective( name, __moduleName, ddo );

export default __moduleName;
