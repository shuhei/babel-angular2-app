import { assert } from 'rtts_assert/rtts_assert';

export class Greeter {
  say(greeting: string, name: string) {
    const capitalized = this._capitalize(greeting);
    return `${capitalized}, ${name}!`
  }

  _capitalize(str: string) {
    if (str) {
      return str.replace(/^(.)/, (c) => c.toUpperCase());
    } else {
      return str;
    }
  }
}
