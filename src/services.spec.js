import {Greeter} from './services';

describe('Greeter', () => {
  describe('#say', () => {
    it('greets to the given name', () => {
      const greeter = new Greeter();
      expect(greeter.say('Hello', 'Angular 2')).toEqual('Hello, Angular 2!');
    });

    it('capitalizes greeting', () => {
      const greeter = new Greeter();
      expect(greeter.say('hello', 'Angular 2')).toEqual('Hello, Angular 2!');
    });
  });
});
