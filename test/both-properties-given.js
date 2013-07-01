'use strict';
/*jshint asi: true */

var test = require('tape')
var proxyquire = require('proxyquire')

var properties = { 
    user      :  'Please enter your username :  '
  , password  :  'Please enter your password :  '
  , '@secret' :  'password'
  };
var config = { user: 'humptydumpty', password: 'hump' };

test('\n when no property is missing', function (t) {
  var promptlyMsg;
  var promfig = proxyquire('..', {
      pw: function (cb) { 
        t.fail('should not get user input')
      }
    , promptly: {
        prompt: function (msg, cb) {
          t.fail('should not get user input')
        }
      }
  })

  promfig(
      properties
    , config 
    , function (err, config_) {
        if (err) return console.error('err: ', err);
        t.deepEqual(
            config_
          , config
          , 'passes thru all properties from complete config'
        )
        t.end()
    }
  );
})
