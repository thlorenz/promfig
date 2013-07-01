#!/usr/bin/env node

var promfig = require('..')
var properties = { 
    user      :  'Please enter your username :  '
  , password  :  'Please enter your password :  '
  , '@secret' :  'password'
  };
var config = {};

promfig(
    properties
  , config 
  , function (err, config) {
      if (err) return console.error('err: ', err);
      console.log(config);
  }
);
