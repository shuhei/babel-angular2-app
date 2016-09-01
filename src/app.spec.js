/* eslint-env jasmine */
import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Greeter } from './services';
import { Hello, Ciao, Linker } from './app';

describe('Hello', () => {
  it('renders greeting', () => {
    TestBed.configureTestingModule({ declarations: [Hello], providers: [Greeter] });

    const fixture = TestBed.createComponent(Hello);
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toEqual('Hello, Angular 2!');
  });
});

describe('Ciao', () => {
  it('renders greeting', () => {
    const params = { name: 'Babel' };
    const url = [new UrlSegment('ciao', params)];
    const route = new ActivatedRoute(Observable.of(url), Observable.of(params));
    TestBed.configureTestingModule({
      declarations: [Ciao],
      providers: [Greeter, { provide: ActivatedRoute, useValue: route }],
    });

    const fixture = TestBed.createComponent(Ciao);
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.textContent).toEqual('Ciao, Babel!');
  });
});

describe('Linker', () => {
  @Component({
    template: '<linker url="http://foo.com" name="Foo"></linker>',
    directives: [Linker],
  })
  class Parent {}

  it('renders a link with given attributes', () => {
    TestBed.configureTestingModule({ declarations: [Parent, Linker] });

    const fixture = TestBed.createComponent(Parent);
    fixture.detectChanges();

    const linker = fixture.debugElement.children[0];
    const instance = linker.componentInstance;
    expect(instance.name).toEqual('Foo');
    expect(instance.url).toEqual('http://foo.com');
    const anchor = linker.nativeElement.querySelector('a');
    expect(anchor.href).toEqual('http://foo.com/');
    expect(anchor.title).toEqual('Foo');
    expect(anchor.textContent).toEqual('Foo');
  });
});
