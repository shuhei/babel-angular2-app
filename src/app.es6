import 'babel-core/polyfill';
import 'reflect-metadata';
import { assert } from 'rtts_assert/rtts_assert';

import { Component, View, Attribute, bootstrap } from 'angular2/angular2';
import { Router, RouterOutlet, routerInjectables } from 'angular2/router';
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
    router.config({ path: '/', component: Hello })
      .then((_) => router.navigate('/'));
  }
}

bootstrap(HelloApp, [
  routerInjectables
]);
