//noinspection BadExpressionStatementJS
'format es6';

export class ResolvingMovieServiceSpy {
  constructor () {
    this.getAllCalled = false;
    this.getOneCalled = false;
    this.createMovieCalled = false;
    this.updateMovieCalled = false;
    this.deleteMovieCalled = false;
    this.getDefaultImageCalled = false;
    this.movies = [
      { name : 'foo' }
    ];
  }

  getAll () {
    this.getAllCalled = true;
    return Promise.resolve( this.movies );
  }

  getOne ( id ) {
    this.getOneCalled = true;
    this.id = id;
    return Promise.resolve( this.movies[ 0 ] );
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

  deleteMovie ( movie ) {
    this.deleteMovieCalled = true;
    this.movie = movie;
    return Promise.resolve( this.movie );

    // This is a reference for how you can ensure that your tests correctly fail
    // when in hooks (beforeEach etc.) returning an (expected) promise back (in
    // contrast to the preferable way of calling the done callback), even if
    // the SUT doesn't actually return a valid promise.

    //return new Promise(( resolve ) => {
    //  setTimeout(() => {
    //    console.log( '(movie-service) inside promise. setting' +
    //      ' deleteMovieCalled  = true' );
    //    this.deleteMovieCalled = true;
    //    this.movie = movie;
    //
    //    console.log( '(movie-service) resolving deleteMovie() promise' );
    //    resolve( this.movie );
    //  }, 0 );
    //});
  }
  getDefaultImage () {
    this.getDefaultImageCalled = true;
    return Promise.resolve( 'defaultBase64Image' );
  }

  createMovieCalledWith ( expectedMovie ) {
    return this.createMovieCalled && ( this.movie === expectedMovie );
  }

  updateMovieCalledWith ( expectedMovie ) {
    return this.updateMovieCalled && ( this.movie === expectedMovie );
  }

  deleteMovieCalledWith ( expectedMovie ) {
    return this.deleteMovieCalled && ( this.movie === expectedMovie );
  }

  getOneCalledWith ( expectedId ) {
    return this.getOneCalled && ( this.id === expectedId );
  }
}

export class ResolvingRealtimeMovieServiceStub {
  constructor ( movies ) {
    this.movies = movies;
  }

  getAll () {
    return Promise.resolve( this.movies );
  }

  deleteMovie ( movie ) {
    let deletedMovieIndex = this.movies.indexOf( movie );
    this.movies.splice( deletedMovieIndex, 1 );
    return Promise.resolve( movie );
  }
}

export class RejectingMovieServiceSpy {
  constructor ( errorToThrow ) {
    this.errorToThrow = errorToThrow;
  }

  getAll () {
    return Promise.reject( this.errorToThrow );
  }

  getOne () {
    return Promise.reject( this.errorToThrow );
  }

  createMovie () {
    return Promise.reject( this.errorToThrow );
  }

  updateMovie () {
    return Promise.reject( this.errorToThrow );
  }

  deleteMovie () {
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
