'use strict';

var _ = require('lodash');

function sprinfMock (sprintfLib, config) {
  var oldSprintf = sprintfLib.sprintf;

  sprintfLib.sprintf = function () {
    if (arguments.length) {
      var _arguments = arguments;
      var match = config.filter(function (parser) {
        return new RegExp(parser.pattern).test(_arguments[0]);
      })[0] || null;

      if (match) {
        arguments[0] = match.callback(arguments[0], _.rest(arguments));
      }
    }

    return oldSprintf.apply(this, arguments);
  };
}

module.exports = sprinfMock;
