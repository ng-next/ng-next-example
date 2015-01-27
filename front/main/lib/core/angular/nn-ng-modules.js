// TODO: rename to NnNgModules
class NnNgModules {
  constructor () {
    this._angularCoreModules = [];
    this._angularModules = new Set();
  }
  register ( angularModuleName ) {
    if ( typeof angularModuleName !== 'string' ) {
      throw new Error(
        'parameter "angularModuleName" must be of type "String".' );
    }

    this._angularModules.add( angularModuleName );
  }

  registerCore ( angularCoreModules ) {
    if ( typeof angularCoreModules !== 'object' ) {
      throw new Error(
        'parameter "angularCoreModules" must be of type "Array" (Object).' );
    }

    this._angularCoreModules = this._angularCoreModules
                                 .concat( angularCoreModules );
  }

  getAll () {
    return this._angularCoreModules.concat( [ ...this._angularModules ] );
  }
}

export default new NnNgModules();
