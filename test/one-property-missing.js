'use strict';
/*jshint asi: true */

var test = require('tape')
var proxyquire = require('proxyquire')
var promfig = require('..')

var properties = { 
    user      :  'Please enter your username :  '
  , password  :  'Please enter your password :  '
  , '@secret' :  'password'
  };
var config = { user: 'humptydumpty' };

test('\n when one of two properties is missing', function (t) {
  var promfig = proxyquire('..', {
    pw: function (cb) { setTimeout(cb.bind(null, 'pass'), 5) }
  })

  promfig(
      properties
    , config 
    , function (err, config) {
        if (err) return console.error('err: ', err);
        console.log(config);
        t.deepEqual(
            config
          , { user: 'humptydumpty', password: 'pass' }
          , 'fills in missing secret property from user input'
        )
        t.end()
    }
  );
})

