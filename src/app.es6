import 'babel-core/polyfill';
import { assert } from 'rtts_assert/rtts_assert';

import { Component, View, Attribute, bootstrap } from 'angular2/angular2';
import { Greeter } from './services';

@Component({
  selector: 'hello',
  injectables: [Greeter]
})
@View({
  template: `
    <p>{{message}}</p>
  `
})
class Hello {
  constructor(greeter: Greeter, @Attribute('message') message) {
    this.message = greeter.hello('Angular 2 app');
    // Just to demonstrate argument annotation.
    console.log(message);
  }
}

@Component({
  selector: 'hello-app'
})
@View({
  directives: [Hello],
  template: `
    <hello message="find me on console"></hello>
  `
})
class HelloApp {
  constructor() {
  }
}

bootstrap(HelloApp);
