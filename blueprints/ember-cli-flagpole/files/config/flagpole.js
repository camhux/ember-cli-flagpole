/* eslint-env node */
const flag = require('ember-cli-flagpole').flag;

const STAGING = 'staging';
const PROD = 'production';

/*
flag('myFeature')
  .default(false)
  .env(STAGING, true);

flag('myOtherFeature')
  .default(true)
  .env(PROD, true);
*/

  /*
    ENV.featureFlags = {
      myFeature: {
        default: false,
        environments: {
          staging: true,
        }
      },
      myOtherFeature: {
        default: true,
        environments: {
          production: true
        }
      }
    }
   */

   /*
     run flagpole.js
     detect environment setting from ENV
     flatten featureFlags to <feature>: <bool> based on ENV
       default takes effect for any defined flags lacking default or configuration for that env


    */
