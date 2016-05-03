import 'babel-polyfill';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import {provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {HelloApp} from './app';

bootstrap(HelloApp, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]).catch(err => console.error(err));
