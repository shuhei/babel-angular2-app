import {Component, provide} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {
  AsyncTestCompleter,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it,
  TestComponentBuilder,
} from 'angular2/testing_internal';

import {Greeter} from './services';
import {Hello, Ciao, Linker} from './app';

describe('Hello', () => {
  beforeEachProviders(() => [Greeter]);

  it('renders greeting', inject([TestComponentBuilder, AsyncTestCompleter], (tcb, async) => {
    tcb.createAsync(Hello)
      .then((fixture) => {
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement).toHaveText('Hello, Angular 2!');

        async.done();
      })
      .catch((e) => console.error(e));
  }));
});

describe('Ciao', () => {
  beforeEachProviders(() => [
    Greeter,
    provide(RouteParams, { useValue: new RouteParams({ name : 'Babel' }) })
  ]);

  it('renders greeting', inject([TestComponentBuilder, AsyncTestCompleter], (tcb, async) => {
    tcb.createAsync(Ciao)
      .then((fixture) => {
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement).toHaveText('Ciao, Babel!');

        async.done();
      })
      .catch((e) => console.error(e));
  }));
});

describe('Linker', () => {
  beforeEachProviders(() => []);

  @Component({
    template: '<linker url="http://foo.com" name="Foo"></linker>',
    directives: [Linker]
  })
  class Parent {}

  it('renders a link with given attributes', inject([TestComponentBuilder, AsyncTestCompleter], (tcb, async) => {
    tcb.createAsync(Parent)
      .then((fixture) => {
        fixture.detectChanges();

        const linker = fixture.debugElement.componentViewChildren[0];
        const instance = linker.componentInstance;
        expect(instance.name).toEqual('Foo');
        expect(instance.url).toEqual('http://foo.com');
        const anchor = linker.nativeElement.querySelector('a');
        expect(anchor.href).toEqual('http://foo.com/');
        expect(anchor.title).toEqual('Foo');
        expect(anchor).toHaveText('Foo');

        async.done();
      })
      .catch((e) => console.error(e));
  }));
});
