'use strict';

var sprintfLib = require('sprintf-js');
var config = require('./support/config.js');

module.exports = {

  'setUp': function (go) {
    // Stubbing the sprintf method
    sprintfLib.sprintf = function () {
      return arguments;
    };

    // Init module
    require('../lib/sprintf-mock')(sprintfLib, config);

    go();
  },

  'Method sprintf': {
    'matching simple pattern': function (test) {
      var args = sprintfLib.sprintf('https://domain.example/%d/%s', 666, 'links');

      test.equal(args[0].pattern, 'https://domain.example/%d/%s');
      test.deepEqual(args[0].params, [666, 'links']);
      test.equal(args[1], 666);
      test.equal(args[2], 'links');
      test.done();
    },

    'unmatching simple pattern': function (test) {
      var args = sprintfLib.sprintf('https://otherdomain.example/%d/%s', 666, 'links');

      test.equal(args[0], 'https://otherdomain.example/%d/%s');
      test.equal(args[1], 666);
      test.equal(args[2], 'links');
      test.done();
    }
  }
};
