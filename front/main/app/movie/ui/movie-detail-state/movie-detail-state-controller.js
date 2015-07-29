//noinspection BadExpressionStatementJS
'format es6';

export default class MovieDetailStateController {
  constructor (
    ctx,
    $state,
    log,
    movieService,
    movie,
    fileReaderService
  ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.$state = $state;
    this.log = log;
    this.ctx = ctx;
    this.movieService = movieService;
    this.fileReaderService = fileReaderService;
    this.data = movie;
  }

  isCreateMode () {
    return !this.data.id;
  }

  saveMovie ( movie ) {
    let action;

    if ( this.isCreateMode() ) {
      action = 'createMovie';
    } else {
      action = 'updateMovie';
    }

    return this.ctx.$q(( resolve, reject ) => {
      this.movieService[ action ]( movie )
        .then(() => {
          resolve( this.$state.transitionTo( 'root.movie.list' ));
        })
        .catch( error => {
          this.log.error( 'Could not save movie.', error );
          reject( error );
        });
    });
  }

  addImage ( file ) {
    return this.ctx.$q(( resolve, reject ) => {
      // "file instanceof File" hard to unit test
      if ( typeof file === 'object' ) { // jshint ignore:line
        this.fileReaderService.readAsDataUrl( file )
        .then( dataUrlImage64 => {
          if ( this.data.images.indexOf( dataUrlImage64 ) === -1 ) {
            this.data.images.push( dataUrlImage64 );
          } else {
            this.log.info( 'Image alredy exists.' );
          }
          resolve( dataUrlImage64 );
        })
        .catch( error => {
          this.log.error( 'Could not read image.' );
          reject( error );
        });
      } else {
        resolve();
      }
    });
  }
}
