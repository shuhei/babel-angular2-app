import 'babel-core/polyfill';
import 'reflect-metadata';
import { assert } from 'rtts_assert/rtts_assert';

import { bind } from 'angular2/di';
import { Component, View, Attribute, bootstrap } from 'angular2/angular2';
import { Route, Router, RouteConfig, LocationStrategy, HashLocationStrategy, routerInjectables, routerDirectives } from 'angular2/router';
import { BrowserDomAdapter } from 'angular2/src/dom/browser_adapter';
import { Greeter } from './services';

@Component({
  selector: 'hello'
})
@View({
  template: `
    <p>{{ message }}</p>
  `
})
class Hello {
  // constructor(greeter: Greeter, @Attribute('name') name) {
  constructor(greeter: Greeter) {
    this.message = greeter.hello('Angular 2 App');
  }

  clicked() {
    console.log('clicked');
  }
}

@Component({
  selector: 'ciao'
})
@View({
  template: `
    Ciao
    {{ message }}
  `
})
class Ciao {
  constructor(greeter: Greeter) {
    this.message = greeter.hello('Ciao');
  }
}

@Component({
  selector: 'hello-app',
  viewBindings: [Greeter]
})
@View({
  directives: [Hello, routerDirectives],
  template: `
    <ul>
      <li><a [router-link]="['/hello']">Hello</a></li>
      <li><a [router-link]="['/ciao']">Ciao</a></li>
    </ul>
    <router-outlet></router-outlet>
  `
})
@RouteConfig([
  new Route({ path: '/', component: Hello, as: 'hello' }),
  new Route({ path: '/ciao', component: Ciao, as: 'ciao' })
])
class HelloApp {
  constructor(router: Router) {
    this.router = router;
  }
}

bootstrap(HelloApp, [
  routerInjectables,
  bind(LocationStrategy).toFactory(() => {
    const strategy = new HashLocationStrategy();
    strategy.internalBaseHref = '/';
    return strategy;
  })
]);
