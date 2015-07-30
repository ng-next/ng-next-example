// jscs:disable disallowAnonymousFunctions
//noinspection BadExpressionStatementJS
'format es6';

let name = 'nnFileInput';

import { registerDirective } from 'nn-ng-utils';

export var ddo = () => { // $parse
  //noinspection BadExpressionStatementJS
  'ngInject';

  return {
    restrict : 'E',
    replace  : true,
    template : '<input type="file" />',
    scope    : {
      onChange : '&'
    },
    link     : function ( scope, element ) {
      let onChange = () => {
        let selectedFile = element[ 0 ].files[ 0 ];
        scope.onChange({ file : selectedFile });
      };

      element.bind( 'change', onChange );
    }
  };
};

registerDirective( name, ddo );
