const { sprintfMock } = require('../sprintf-mock');
const sprintfLib = require('sprintf-js');

jest.mock('sprintf-js');

const config = [
  {
    pattern: 'https://domain.example/%d/%s',
    callback: function (pattern, params) {
      return {pattern: pattern, params: params};
    }
  }
];


describe('sprinfMock', () => {
  beforeEach(() => {
    sprintfLib.sprintf = jest.fn((...args) => args)
    sprintfMock(sprintfLib, config);
  });

  it('should match config pattern and use mock', () => {
    const args = sprintfLib.sprintf('https://domain.example/%d/%s', 666, 'links');
    expect(args).toMatchSnapshot();
  });

  it('should do noting on sprintf mock because pattern does not match config', () => {
    const args = sprintfLib.sprintf('https://otherdomain.example/%d/%s', 666, 'links');
    expect(args).toMatchSnapshot();
  })
});
