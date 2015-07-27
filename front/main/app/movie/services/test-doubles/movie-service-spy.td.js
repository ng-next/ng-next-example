//noinspection BadExpressionStatementJS
'format es6';

export class ResolvingMovieServiceSpy {
  constructor () {
    this.getAllCalled = false;
    this.createMovieCalled = false;
    this.updateMovieCalled = false;
    this.movies = [
      { name : 'foo' }
    ];
  }

  getAll () {
    this.getAllCalled = true;
    return Promise.resolve( this.movies );
  }

  createMovie ( newMovie ) {
    this.createMovieCalled = true;
    this.movie = newMovie;
    return Promise.resolve( this.movie );
  }

  updateMovie ( movie ) {
    this.updateMovieCalled = true;
    this.movie = movie;
    return Promise.resolve( this.movie );
  }

  createMovieCalledWith ( expectedMovie ) {
    return this.createMovieCalled && ( this.movie === expectedMovie );
  }

  updateMovieCalledWith ( expectedMovie ) {
    return this.updateMovieCalled && ( this.movie === expectedMovie );
  }
}

export class RejectingMovieServiceSpy {
  constructor ( errorToThrow ) {
    this.errorToThrow = errorToThrow;
  }

  getAll () {
    return Promise.reject( this.errorToThrow );
  }

  createMovie () {
    return Promise.reject( this.errorToThrow );
  }

  updateMovie () {
    return Promise.reject( this.errorToThrow );
  }
}

export class MovieServiceDummy {
  getAll () {
    return Promise.resolve( null );
  }

  createMovie () {
    return Promise.resolve( null );
  }

  updateMovie () {
    return Promise.resolve( null );
  }
}
