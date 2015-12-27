import 'babel-polyfill';
import 'reflect-metadata';
import 'zone.js/lib/browser/zone-microtask';

import {BrowserDomAdapter} from 'angular2/platform/browser'
BrowserDomAdapter.makeCurrent();
