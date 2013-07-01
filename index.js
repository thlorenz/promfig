'use strict';
var prompt =  require('promptly').prompt
  , pw     =  require('pw')
  , xtend  =  require('xtend')
  , runnel =  require('runnel')
  , secret =  '@secret';

function getMissings(properties, config) {
  return Object.keys(properties)
    .filter(function (k) { 
      return typeof config[k] === 'undefined' && k !== secret; 
    })
    .map(function (k) { 
      return { property: k, prompt: properties[k] }; 
    });
}

var promfig = module.exports = function (properties, config, cb) {

  var missings  =  getMissings(properties, config)
    , responses =  {}
    , secrets   =  properties[ secret ] || []
    ;

  if (!Array.isArray(secrets)) secrets = [ secrets ];

  function handle(missing, value) {
    responses[missing.property] = value;
  }

  var tasks = missings
    .map(function (missing) {
      return ~secrets.indexOf(missing.property)
        ? function secretPrompt (cb) {
            process.stdout.write(missing.prompt);
            pw(function (value) {
              handle(missing, value);
              cb();
            });
          }
        : function nonsecretPrompt (cb) { 
            prompt(missing.prompt, function (err, value) {
              if (err) return cb(err);
              handle(missing, value);
              cb();
            });
        }
    });

  tasks.push(function (err) {
    if (err) return cb(err);
    cb(null, xtend(config, responses));
  });

  runnel(tasks);
};
