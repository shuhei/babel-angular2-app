export class Greeter {
  say(greeting, name) {
    const capitalized = this.capitalize(greeting);
    return `${capitalized}, ${name}!`;
  }

  capitalize(str) {
    if (!str) {
      return str;
    }
    return str.replace(/^(.)/, c => c.toUpperCase());
  }
}
