//noinspection BadExpressionStatementJS
'format es6';

export class ResolvingMovieServiceSpy {
  constructor () {
    this.getAllCalled = false;
    this.movies = [
      { name : 'foo' }
    ];
  }

  getAll () {
    this.getAllCalled = true;
    return Promise.resolve( this.movies );
  }
}

export class RejectingMovieServiceSpy {
  constructor ( errorToThrow ) {
    this.errorToThrow = errorToThrow;
  }

  getAll () {
    return Promise.reject( this.errorToThrow );
  }
}

export class MovieServiceDummy {
  getAll () {
    return Promise.resolve( null );
  }
}
