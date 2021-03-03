import _tail from 'lodash.tail';

export interface SprintfLib {
  sprintf(format: string, ...args: unknown[]): string;
  vsprintf(format: string, args: unknown[]): string;
}

export interface Rule {
  /**
   * sprintf string pattern
   */
  pattern: string,
  /**
   * Handler of your mock for this pattern
   * @param pattern the previously defined pattern
   * @param params parameters used to resolve the pattern
   */
  callback:(pattern:string, params: unknown[]) => string
}

export type Config = Array<Rule>
/**
 * sprintf-mock setup function
 *
 * @param sprintfLib the instance of sprintf you want to mock
 * @param config mock config
 */
export function sprintfMock (sprintfLib: SprintfLib, config:Config):void {
  const oldSprintf= sprintfLib.sprintf;

  sprintfLib.sprintf = function (...args) {
    if (arguments.length) {
      const _arguments = args;
      const match = config.filter(function (parser) {
        return new RegExp(parser.pattern).test(_arguments[0]);
      })[0] || null;

      if (match) {
        args[0] = match.callback(args[0], _tail(args));
      }
    }

    return oldSprintf.apply(this, args);
  };
}
