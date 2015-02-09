//noinspection BadExpressionStatementJS
'format es6';

export default ( app ) => {
  app.constant( 'cnst', constants());
};

function constants () {
  var keyCodes = {
    backspace : 8,
    tab       : 9,
    enter     : 13,
    esc       : 27,
    space     : 32,
    pageup    : 33,
    pagedown  : 34,
    end       : 35,
    home      : 36,
    left      : 37,
    up        : 38,
    right     : 39,
    down      : 40,
    insert    : 45,
    del       : 46
  };

  var imageSettings = {
    imageBasePath            : 'lib/assets/images/',
    iconBasePath             : 'lib/assets/icons/',
    unknownPersonImageSource : 'unknown_person.jpg'
  };

  var events = {
    controllerActivateSuccess : 'controller.activateSuccess',
    stateChangeStart          : '$stateChangeStart',
    stateChangeSuccess        : '$stateChangeSuccess',
    stateChangeError          : '$stateChangeError'
  };

  return {
    // TODO: set accordingly during gulp build tasks
    isDev          : isDev(),
    appErrorPrefix : exceptionHandlerDecoratorConfiguration(),
    events         : events,
    imageSettings  : imageSettings,
    keyCodes       : keyCodes,
    version        : '0.0.1' // can this be generated from package.json during
                             // build ?
  };

  /* nn-is-development */ function isDev(){return true;} /* nn-is-development */ //jscs:disable

  function exceptionHandlerDecoratorConfiguration () {
    return '[NN Error] ';
  }
}
