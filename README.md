
# sprintf-mock [![Build Status](https://api.travis-ci.org/M6Web/sprintf-mock.png?branch=master)](https://travis-ci.org/M6Web/sprintf-mock)

[sprintf-js](https://github.com/alexei/sprintf.js) plugin allowing to mock sprintf behaviour by returning data fixtures based on the resolved pattern and parameters. For example, it's useful if you build some external resources URLs in your app with sprintf and you rather want to request local resources in your functional tests.

## Installation

Install with [npm](http://npmjs.org/):

```sh
$ npm install sprintf-mock
```

## Usage

First, you have to define the pattern to mock in a configuration file:

```js
// ./sprintf-mock-config.js file
module.exports = [
  {
    // sprintf string pattern
    pattern: 'https://domain.example/%s',

    // `pattern`: above sprintf pattern
    // `params`: parameters used to resolve the pattern
    callback: function (pattern, params) {
      
      // Do some transformations
      
      // Static string or another sprintf pattern resolved with params
      return newPattern;
    }
  },
  ...
];
```

Then use the plugin:

```js
// ./server.js file
var sprintfLib = require(sprintf-js);
var config = require(‘./sprintf-mock-config);

require(sprintf-mock’)(sprintfLib, config);
```

## Tests

To run units tests: `npm test`.

To check code style: `npm run lint`.

## Credits

Developped by the [Cytron Team](http://cytron.fr/) of [M6 Web](http://tech.m6web.fr/).   
Tested with [nodeunit](https://github.com/caolan/nodeunit).

## License

sprintf-mock is licensed under the [MIT license](LICENSE).
