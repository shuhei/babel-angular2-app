import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
import 'babel-core/polyfill';
import { assert } from 'rtts_assert/rtts_assert';

import { bind, Injector } from 'angular2/di';
import { Component, View, Attribute, bootstrap } from 'angular2/angular2';
import { Router, RouteConfig, RouteParams, LocationStrategy, HashLocationStrategy, ROUTER_BINDINGS, ROUTER_DIRECTIVES } from 'angular2/router';
import { Greeter } from './services';

@Component({
  selector: 'hello'
})
@View({
  template: '<p>{{ message }}</p>'
})
class Hello {
  constructor(greeter: Greeter) {
    this.message = greeter.say('hello', 'Angular 2');
  }
}

@Component({
  selector: 'ciao'
})
@View({
  template: '<p>{{ message }}</p>'
})
class Ciao {
  constructor(greeter: Greeter, routeParams: RouteParams) {
    this.message = greeter.say('ciao', routeParams.get('name'));
  }
}

@Component({
  selector: 'linker'
})
@View({
  template: '<p><a [href]="url" [title]="name">{{ name }}</a></p>'
})
class Linker {
  constructor(greeter: Greeter, @Attribute('name') name, @Attribute('url') url) {
    this.name = name;
    this.url = url;
  }
}

@Component({
  selector: 'hello-app',
  viewBindings: [Greeter]
})
@View({
  directives: [ROUTER_DIRECTIVES, Linker],
  template: `
    <ul>
      <li><a [router-link]="['/hello']">Hello</a></li>
      <li><a [router-link]="['/ciao', { name: 'ng2' }]">Ciao</a></li>
    </ul>
    <router-outlet></router-outlet>
    <linker name="babel-angular2-app" url="https://github.com/shuhei/babel-angular2-app"></linker>
  `
})
@RouteConfig([
  { path: '/', component: Hello, as: 'hello' },
  { path: '/ciao/:name', component: Ciao, as: 'ciao' }
])
class HelloApp {
}

bootstrap(HelloApp, [
  ROUTER_BINDINGS,
  bind(LocationStrategy).toClass(HashLocationStrategy)
]);
