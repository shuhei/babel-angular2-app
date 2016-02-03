import 'babel-polyfill';
import 'reflect-metadata';
import 'zone.js/lib/browser/zone-microtask';

import {setBaseTestProviders} from 'angular2/testing';
import {
    TEST_BROWSER_PLATFORM_PROVIDERS,
      TEST_BROWSER_APPLICATION_PROVIDERS
} from 'angular2/platform/testing/browser';

setBaseTestProviders(TEST_BROWSER_PLATFORM_PROVIDERS,
                     TEST_BROWSER_APPLICATION_PROVIDERS);
