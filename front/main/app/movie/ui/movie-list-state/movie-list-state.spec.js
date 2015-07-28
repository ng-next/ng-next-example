//TODO test ui-state to ensure resolving of movies from movieService and error
// logging (due to controller refactoring)

////noinspection BadExpressionStatementJS
//'format es6';
//
//import 'angular';
//import 'angular-mocks';
//import { LogSpy, LogDummy } from 'test-doubles-log-service';
//
//
//  describe( 'given a movieService that rejects with an error', () => {
//    let movieServiceError;
//    let rejectingMovieServiceSpy;
//    let logSpy;
//    let stateDummy;
//
//    beforeEach(() => {
//      movieServiceError = 'fake webservice is down!';
//      rejectingMovieServiceSpy = new RejectingMovieServiceSpy(
//        Error( movieServiceError )
//      );
//      logSpy = new LogSpy();
//      stateDummy = new StateDummy();
//    });
//
//    describe( 'when instantiating', () => {
//      beforeEach(() => {
//        controller = new Controller( stateDummy, logSpy,
//          rejectingMovieServiceSpy );
//      });
//
//      it( 'should log error "Error retrieving data".', done => {
//        rejectingMovieServiceSpy.getAll().should.be.rejected
//        .then(() => {
//          expect( controller.data ).to.deep.equal({});
//          expect( logSpy.errorCalledWith(
//            'Error retrieving data',
//            movieServiceError
//          )).to.equal( true, 'must log error' );
//        }).should.notify( done );
//      });
//    });
//  });
