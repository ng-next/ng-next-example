//noinspection BadExpressionStatementJS
'format es6';

let ngName = 'mdToastConfig';

// TODO: make alias
import { registerProvider } from 'app/core/angular/nn-register-ng-provider';

import MdToastConfig from './md-toast-config';

export default MdToastConfigProvider;

const DEFAULT_HIDE_DELAY = 3000;
const DEFAULT_POSITION = 'bottom right';
const DEFAULT_PARENT_ELEMENT_NAME = 'footer';

class MdToastConfigProvider {
  constructor () {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.config = new MdToastConfig(
      DEFAULT_HIDE_DELAY,
      DEFAULT_POSITION,
      DEFAULT_PARENT_ELEMENT_NAME
    );
  }

  $get () {
    return this.config;
  }

  setPosition ( value ) {
    this.config.position = value;
  }

  setHideDelay ( value ) {
    this.config.hideDelay = value;
  }

  setParentElementName ( firstElementFoundByTagName ) {
    this.config.parentElementName = firstElementFoundByTagName;
  }
}

registerProvider( ngName, __moduleName, MdToastConfigProvider );
