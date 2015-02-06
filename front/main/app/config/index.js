//noinspection BadExpressionStatementJS
'format es6';

import { nnNgConfigurations } from 'nn-ng-utils';

import configureConstants from './constants-ng-config';
import './exceptions-ng-config';
import './routes-ng-config';
import './ui-state-security-ng-config';
import './ui-router-ng-config';
import './md-toast-ng-config';
import './logging-ng-config';

export default ( app ) => {
  configureConstants( app );
  nnNgConfigurations.configureApp( app );
};
