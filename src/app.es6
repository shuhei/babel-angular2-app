import 'babel-core/polyfill';
import { assert } from 'rtts_assert/rtts_assert';

import { Component, Template, bootstrap } from 'angular2/angular2';
import { Greeter } from './services';

@Component({
  selector: 'hello-app',
  services: [Greeter]
})
@Template({
  inline: `
    <p>{{message}}</p>
  `
})
class HelloApp {
  constructor(greeter: Greeter) {
    this.message = greeter.hello('Angular 2 app');
  }
}

bootstrap(HelloApp);
