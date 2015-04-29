import 'babel-core/polyfill';
import { assert } from 'rtts_assert/rtts_assert';

import { Component, View, Attribute, bootstrap } from 'angular2/angular2';
import { bind } from 'angular2/di';
import { Router, RouterOutlet, RouterLink, RouteParams, RouteConfig } from 'angular2/router';
import { RootRouter } from 'angular2/src/router/router';
import { Pipeline } from 'angular2/src/router/pipeline';
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
  // constructor(greeter: Greeter, @Attribute('name') name) {
  constructor(greeter: Greeter) {
    this.message = greeter.hello('Angular 2 App');
  }
}

@Component({
  selector: 'hello-app'
})
@View({
  directives: [Hello, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `
})
class HelloApp {
  constructor(router: Router) {
    router.config('/hello', Hello)
      .then((_) => router.navigate('/hello'))
  }
}

bootstrap(HelloApp, [
  bind(Router).toValue(new RootRouter(new Pipeline()))
]);
