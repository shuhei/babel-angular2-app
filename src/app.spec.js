import {Component, provide} from '@angular/core';
import {RouteSegment} from '@angular/router';
import {
  async,
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  inject,
  it,
} from '@angular/core/testing';
import {TestComponentBuilder} from '@angular/compiler/testing';

import {Greeter} from './services';
import {Hello, Ciao, Linker} from './app';

describe('Hello', () => {
  beforeEachProviders(() => [Greeter]);

  it('renders greeting', async(inject([TestComponentBuilder], (tcb) => {
    tcb.createAsync(Hello)
      .then((fixture) => {
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement).toHaveText('Hello, Angular 2!');
      });
  })));
});

describe('Ciao', () => {
  beforeEachProviders(() => [Greeter]);

  it('renders greeting', async(inject([TestComponentBuilder], (tcb) => {
    tcb.createAsync(Ciao)
      .then((fixture) => {
        const curr = new RouteSegment([], { name: 'Babel' }, null, null);
        fixture.debugElement.componentInstance.routerOnActivate(curr);
        fixture.detectChanges();

        expect(fixture.debugElement.nativeElement).toHaveText('Ciao, Babel!');
      });
  })));
});

describe('Linker', () => {
  beforeEachProviders(() => []);

  @Component({
    template: '<linker url="http://foo.com" name="Foo"></linker>',
    directives: [Linker]
  })
  class Parent {}

  it('renders a link with given attributes', async(inject([TestComponentBuilder], (tcb) => {
    tcb.createAsync(Parent)
      .then((fixture) => {
        fixture.detectChanges();

        const linker = fixture.debugElement.children[0];
        const instance = linker.componentInstance;
        expect(instance.name).toEqual('Foo');
        expect(instance.url).toEqual('http://foo.com');
        const anchor = linker.nativeElement.querySelector('a');
        expect(anchor.href).toEqual('http://foo.com/');
        expect(anchor.title).toEqual('Foo');
        expect(anchor).toHaveText('Foo');
      });
  })));
});
