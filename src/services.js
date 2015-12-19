export class Greeter {
  say(greeting, name) {
    const capitalized = this._capitalize(greeting);
    return `${capitalized}, ${name}!`
  }

  _capitalize(str) {
    if (str) {
      return str.replace(/^(.)/, (c) => c.toUpperCase());
    } else {
      return str;
    }
  }
}
