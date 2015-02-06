// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
//noinspection BadExpressionStatementJS
'format es6';

import jsonp from 'jsonp';

export default class RedditPerfectloopsStateController {
  constructor ( $scope ) {
    //noinspection BadExpressionStatementJS
    'ngInject';

    this.redditUrl = 'https://www.reddit.com/r/perfectloops/top.json';
    this.gifs = {};

    jsonp( this.redditUrl, { param: 'jsonp' }, ( err, result ) => {
      let strippedItems = result.data.children
      .filter( item => !item.data.over_18 )
      .map( item => item.data )
      .filter( item => /gifv?$/.exec( item.url ) )
      .map( item => {
        item.url = item.url.replace( /v$/, '' );
        return item;
      })
      ;

      this.gifs = strippedItems;
      $scope.$apply();
    });
  }
}
