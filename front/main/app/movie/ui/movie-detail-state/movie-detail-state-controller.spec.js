// jscs:disable disallowEmptyBlocks
//noinspection BadExpressionStatementJS
'format es6';

import Controller from './movie-detail-state-controller';
import { LogSpy, LogDummy } from 'test-doubles-log-service';
import { RejectingMovieServiceSpy, ResolvingMovieServiceSpy, MovieServiceDummy }
  from '../../services/test-doubles/movie-service-spy.td';
import { StateDummy, StateSpy, CtxStub, CtxDummy } from 'test-doubles-angular';

describe( 'MovieDetailStateController', () => {
  let controller;
  let stateDummy;
  let logDummy;
  let movieServiceDummy;
  let ctxStub;

  beforeEach(() => {
    stateDummy = new StateDummy();
    logDummy = new LogDummy();
    movieServiceDummy = new MovieServiceDummy();
    ctxStub = new CtxStub();
  });

  describe( 'given a movie', () => {
    let movie;

    beforeEach(() => {
      movie = { id : 1337, images : [] };
    });

    describe( 'when instatiating', () => {
      let ctxDummy;

      beforeEach(() => {
        ctxDummy = new CtxDummy();
        controller = new Controller( ctxDummy, stateDummy, logDummy,
          movieServiceDummy, movie );
      });

      it( 'should keep a reference to the movie', () => {
        expect( controller.data )
          .to.deep.equal( movie, 'must keep a reference to the movie' );
      });

      it( 'should not be in create mode', () => {
        expect( controller.isCreateMode() )
          .to.equal( false, 'must not be in create mode' );
      });
    });

    describe( 'and given a movieService that rejects with an error', () => {
      let movieServiceError;
      let rejectingMovieServiceSpy;
      let logSpy;

      beforeEach(() => {
        movieServiceError = 'fake webservice is down!';
        rejectingMovieServiceSpy = new RejectingMovieServiceSpy(
          Error( movieServiceError )
        );
        logSpy = new LogSpy();
      });

      describe( 'when calling saveMovie()', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateDummy, logSpy,
            rejectingMovieServiceSpy, movie );

          controller.saveMovie( movie ).catch(() => {
            done();
          });
        });

        it( 'should log error "Could not save movie."', () => {
          expect( logSpy.errorCalledWith( 'Could not save movie.',
            movieServiceError )).to.equal( true, 'must log error' );
        });
      });
    });

    describe( 'and given a non-failing movieService', () => {
      let resolvingMovieServiceSpy;

      beforeEach(() => {
        resolvingMovieServiceSpy = new ResolvingMovieServiceSpy();
      });

      describe( 'when calling saveMovie() with an existing movie', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateDummy, logDummy,
            resolvingMovieServiceSpy, movie );

          controller.saveMovie( movie ).then(() => {
            done();
          });
        });

        it( 'should call movieService update() with the movie', () => {
          expect( resolvingMovieServiceSpy.updateMovieCalledWith( movie ))
            .to.equal( true, 'movieService.createMovie() must be called' +
            ' with the existing movie' );
        });
      });
    });

    describe( 'and given a stateProvider', () => {
      let stateSpy;
      beforeEach(() => {
        stateSpy = new StateSpy();
      });

      describe( 'when calling saveMovie()', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateSpy, logDummy,
            movieServiceDummy, movie );

          controller.saveMovie( movie ).then(() => {
            done();
          });
        });

        it( 'should navigate to the movie list afterwrards.', () => {
          const stateName = 'root.movie.list';

          expect( stateSpy.transitionTo.CalledWith( stateName )).to.equal(
            true, 'state.transitionTo must be called with ' + stateName );
        });
      });
    });

    describe( 'and given a fileReaderService and an image file', () => {
      let fileReaderStub;
      let imageFile;
      let expectedCount;

      beforeEach(() => {
        fileReaderStub = new FileReaderStub();
        imageFile = { name : 'foo.jpg', size : 123456, type: 'image/png' };
      });

      describe( 'when adding an image', () => {
        beforeEach( done => {
          expectedCount = movie.images.length + 1;
          controller = new Controller( ctxStub, stateDummy, logDummy,
            movieServiceDummy, movie, fileReaderStub );

          controller.addImage( imageFile ).then(() => {
            done();
          });
        });

        it( 'should add the image to the image collection', () => {
          expect( controller.data.images.length ).to.equal( expectedCount,
            'must add image to the image collection' );
        });
      });

      describe( 'and given the image to add already exists', () => {
        beforeEach(() => {
          movie.images.push( 'data:' + imageFile.type +
            ';base64,iVBORw0KGgoAA' );
        });

        describe( 'when adding a duplicate image', () => {
          beforeEach( done => {
            expectedCount = movie.images.length;
            controller = new Controller( ctxStub, stateDummy, logDummy,
              movieServiceDummy, movie, fileReaderStub );

            controller.addImage( imageFile ).then(() => {
              done();
            });
          });

          it( 'should not add the image to the image collection', () => {
            expect( controller.data.images.length ).to.equal( expectedCount,
              'must add image to the image collection' );
          });
        });

        describe( 'and given a logService', () => {
          let logSpy;

          beforeEach(() => {
            logSpy = new LogSpy();
          });

          describe( 'when adding a duplicate image', () => {
            beforeEach( done => {
              controller = new Controller( ctxStub, stateDummy, logSpy,
                movieServiceDummy, movie, fileReaderStub );

              controller.addImage( imageFile ).then(() => {
                done();
              });
            });

            it( 'should notify the user about the duplicate image', () => {
              expect( logSpy.infoCalledWith( 'Image alredy exists.' ))
                .to.equal( true, 'must log user info' );
            });
          });
        });
      });
    });

    describe( 'and given a failing fileReaderService, an image file and a' +
      ' log service',
    () => {
      let rejectingFileReaderStub;
      let logSpy;
      let imageFile;

      beforeEach(() => {
        rejectingFileReaderStub = new RejectingFileReaderStub();
        logSpy = new LogSpy();
        imageFile = { name : 'foo.jpg', size : 123456, type: 'image/png' };
      });

      describe( 'when adding an image', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateDummy, logSpy,
            movieServiceDummy, movie, rejectingFileReaderStub );

          controller.addImage( imageFile ).catch(() => {
            done();
          });
        });

        it( 'should log an error"Could not read image."', () => {
          expect( logSpy.errorCalledWith( 'Could not read image.' ))
            .to.equal( true, 'must log error' );
        });
      });
    });
  });

  describe( 'given a new movie', () => {
    let movie;

    beforeEach(() => {
      movie = {};
    });

    describe( 'when instatiating', () => {
      beforeEach(() => {
        controller = new Controller( ctxStub, stateDummy, logDummy,
          movieServiceDummy, movie );
      });

      it( 'should be in create mode', () => {
        expect( controller.isCreateMode() )
          .to.equal( true, 'must not be in create mode' );
      });
    });

    describe( 'and given a movieService that rejects with an error', () => {
      let movieServiceError;
      let rejectingMovieServiceSpy;
      let logSpy;

      beforeEach(() => {
        movieServiceError = 'fake webservice is down!';
        rejectingMovieServiceSpy = new RejectingMovieServiceSpy(
          Error( movieServiceError )
        );
        logSpy = new LogSpy();
      });

      describe( 'when calling saveMovie() with a new movie', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateDummy, logSpy,
            rejectingMovieServiceSpy, movie );

          controller.saveMovie( movie ).catch(() => {
            done();
          });
        });

        it( 'should log error "Could not save movie."', () => {
          expect( logSpy.errorCalledWith( 'Could not save movie.',
            movieServiceError )).to.equal( true, 'must log error' );
        });
      });
    });

    describe( 'and given a non-failing movieService', () => {
      let resolvingMovieServiceSpy;

      beforeEach(() => {
        resolvingMovieServiceSpy = new ResolvingMovieServiceSpy();
      });

      describe( 'when calling saveMovie() with a new movie', () => {
        let newMovie;

        beforeEach( done => {
          newMovie = { title: 'foo' };
          controller = new Controller( ctxStub, stateDummy, logDummy,
            resolvingMovieServiceSpy, movie );

          controller.saveMovie( newMovie ).then(() => {
            done();
          });
        });

        it( 'should call movieService create() with the newMovie', () => {
          expect( resolvingMovieServiceSpy.createMovieCalledWith( newMovie ))
            .to.equal( true, 'movieService.createMovie() must be called' +
            ' with the correct newMovie' );
        });
      });
    });

    describe( 'and given a stateProvider', () => {
      let stateSpy;

      beforeEach(() => {
        stateSpy = new StateSpy();
      });

      describe( 'when calling saveMovie()', () => {
        beforeEach( done => {
          controller = new Controller( ctxStub, stateSpy, logDummy,
            movieServiceDummy, movie );

          controller.saveMovie().then(() => {
            done();
          });
        });

        it( 'should navigate to the movie list afterwrards.', () => {
          const stateName = 'root.movie.list';

          expect( stateSpy.transitionTo.CalledWith( stateName )).to.equal(
            true, 'state.transitionTo must be called with ' + stateName );
        });
      });
    });
  });
});

class FileReaderStub {
  readAsDataUrl ( file ) {
    return Promise.resolve( 'data:' + file.type + ';base64,iVBORw0KGgoAA' );
  }
}

class RejectingFileReaderStub {
  readAsDataUrl () {
    return Promise.reject();
  }
}
