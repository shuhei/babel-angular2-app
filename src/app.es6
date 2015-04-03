import 'babel-core/polyfill';
import { assert } from 'rtts_assert/rtts_assert';

// HACK: Set root DOM adapter before it is cached in bootstrap as undefined.
import {BrowserDomAdapter} from 'angular2/src/dom/browser_adapter';
BrowserDomAdapter.makeCurrent();
BrowserDomAdapter.makeCurrent = () => {};

import {Component, Template, bootstrap} from 'angular2/angular2';
import {Greeter} from './services';

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
