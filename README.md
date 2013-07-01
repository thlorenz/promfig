# promfig [![build status](https://secure.travis-ci.org/thlorenz/promfig.png)](http://travis-ci.org/thlorenz/promfig)

Completes a given config by prompting the user for the missing properties.

```js
var promfig = require('promfig')
var properties = { 
    user      :  'Please enter your username :  '
  , password  :  'Please enter your password :  '
  , '@secret' :  'password'
  };
var config = { user: 'humptydumpty' };

promfig(
    properties
  , config 
  , function (err, config) {
      if (err) return console.error('err: ', err);
      console.log(config);
  }
);
```

```
➝  node username-password-one-given.js
Please enter your password :  ******
{ user: 'humptydumpty', password: 'humpty' }
```

[more examples](https://github.com/thlorenz/promfig/tree/master/examples)

## Installation

    npm install promfig

## API

###*promfig(properties : Object, config : Object, callback : Function)*

Will complete the given `config` with by prompting user for missing `properties`.

#### properties

- key/values where the value is the text with which to prompt the user for the property
- `@secret`: special key which takes a `string` or `[ string ]` to configure properties that should be masked while the
  user inputs them

## License

MIT
