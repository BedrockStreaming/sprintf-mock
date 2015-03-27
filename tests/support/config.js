'use strict';

module.exports = [
  {
    pattern: 'https://domain.example/%d/%s',
    callback: function (pattern, params) {
      return {pattern: pattern, params: params};
    }
  }
];
