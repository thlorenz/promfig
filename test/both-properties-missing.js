'use strict';
/*jshint asi: true */

var test = require('tape')
var proxyquire = require('proxyquire')

var properties = { 
    user      :  'Please enter your username :  '
  , password  :  'Please enter your password :  '
  , '@secret' :  'password'
  };
var config = {};

test('\n when both properties are missing', function (t) {
  var promptlyMsg;
  var promfig = proxyquire('..', {
      pw: function (cb) { 
        setTimeout(cb.bind(null, 'pass'), 5) 
      }
    , promptly: {
        prompt: function (msg, cb) {
          promptlyMsg = msg
          setTimeout(cb.bind(null, null, 'humptydumpty'), 5) 
        }
      }
  })

  // silence prompt for password since that messes with test output that tap needs to parse
  process.stdout.write = function () {}
  promfig(
      properties
    , config 
    , function (err, config) {
        if (err) return console.error('err: ', err);

        t.equal(promptlyMsg, properties.user, 'prompts for username with correct message')
        t.deepEqual(
            config
          , { user: 'humptydumpty', password: 'pass' }
          , 'fills in missing secret and non secret properties from user input'
        )
        t.end()
    }
  );
})
