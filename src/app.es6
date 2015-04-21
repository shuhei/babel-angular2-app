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
  constructor(greeter: Greeter, @Attribute('name') name) {
    this.message = greeter.hello(name);
  }
}

@Component({
  selector: 'hello-app'
})
@View({
  directives: [Hello],
  template: `
    <hello name="Angular 2 App"></hello>
  `
})
class HelloApp {
}

bootstrap(HelloApp);
