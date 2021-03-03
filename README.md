
# sprintf-mock

[![Continous Integration](https://github.com/M6Web/sprintf-mock/actions/workflows/node.js.yml/badge.svg)](https://github.com/M6Web/sprintf-mock/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/v/sprintf-mock)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/sprintf-mock)
![npm](https://img.shields.io/npm/dy/sprintf-mock)
![GitHub last commit](https://img.shields.io/github/last-commit/M6web/sprintf-mock)
![NPM](https://img.shields.io/npm/l/sprintf-mock)

[sprintf-js](https://github.com/alexei/sprintf.js) plugin allowing to mock sprintf behaviour by returning data fixtures based on the resolved pattern and parameters. For example, it's useful if you build some external resources URLs in your app with sprintf and you rather want to request local resources in your functional tests.

See [this post](https://tech.bedrockstreaming.com//how-did-we-mock-the-backend-developers.html) to know why we use sprintf-mock at M6Web.

## Installation

Install with [yarn](https://yarnpkg.com/):

```sh
$ yarn add sprintf-mock
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
var sprintfLib = require('sprintf-js');
var config = require('./sprintf-mock-config');
var { sprintfMock } = require('sprintf-mock');

sprintfMock(sprintfLib, config);
```

## Tests

To run units tests: `yarn test`.

To check code style: `yarn lint`.

## Credits

Developped by the Cytron Team of [Bedrock Streaming](https://tech.bedrockstreaming.com/).   
Tested with [Jest](https://jestjs.io/).

## License

sprintf-mock is licensed under the [MIT license](LICENSE).
