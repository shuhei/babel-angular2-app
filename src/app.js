import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
import 'babel-core/polyfill';
import { assert } from 'rtts_assert/rtts_assert';

import {
  Component, View, Attribute,
  bind,
  bootstrap
} from 'angular2/angular2';
import {
  Router, RouteConfig, RouteParams,
  LocationStrategy, HashLocationStrategy,
  ROUTER_BINDINGS, ROUTER_DIRECTIVES, ROUTER_PRIMARY_COMPONENT
} from 'angular2/router';

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
      <li><a [router-link]="['/Hello']">Hello</a></li>
      <li><a [router-link]="['/Ciao', { name: 'ng2' }]">Ciao</a></li>
    </ul>
    <router-outlet></router-outlet>
    <linker name="GitHub" url="https://github.com/shuhei/babel-angular2-app"></linker>
  `
})
@RouteConfig([
  { path: '/', component: Hello, as: 'Hello' },
  { path: '/ciao/:name', component: Ciao, as: 'Ciao' }
])
class HelloApp {
}

bootstrap(HelloApp, [
  ROUTER_BINDINGS,
  bind(LocationStrategy).toClass(HashLocationStrategy),
  // https://github.com/angular/angular/issues/4318
  bind(ROUTER_PRIMARY_COMPONENT).toValue(HelloApp)
]);
