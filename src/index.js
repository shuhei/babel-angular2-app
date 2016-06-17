import 'babel-polyfill';
import 'zone.js/dist/zone';

import {provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {HelloApp, routerProviders} from './app';

bootstrap(HelloApp, [
  routerProviders,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]).catch(err => console.error(err));
