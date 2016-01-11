# Build Angular 2 app with Babel

A skeleton [Angular 2](https://angular.io/) app built with [Babel](https://babeljs.io/) and [Browserify](http://browserify.org/).

- Uses Babel instead of [TypeScript](http://www.typescriptlang.org/)/[Traceur](https://github.com/google/traceur-compiler).
- Supports class/parameter decorators and parameter type annotations with [Babel](https://github.com/babel/babel), [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy) and [babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations).
  - **Parameter decorator is not supported because the syntax is not supported by Babel's parser.**
- Bundles JavaScript files into one file with Browserify. (However, it doesn't use any Browserify-specific technology. You can easily switch to Webpack and etc.)

## Try

### Install

Clone/fork this repo and:

```
npm install
```

### Build

Build once:

```
npm run build
```

Watch files and rebuild:

```
npm run watch
# or
npm start
```

### Preview

```
npm install -g http-server
http-server public
```

### Test

Unit and e2e tests:

```
npm test
```

Unit tests:

```
npm run unit
```

e2e tests:

```
npm run e2e
```

## Motivation

Back in the time of angular2 alpha.18, `angular/quickstart` provided us to try Angular 2 app with on-the-fly transpilation and lazy-loading, which resulted in long waiting time for each file change. Also, I was not familiar with the Traceur tool stack and its output. [angular2 npm package](https://www.npmjs.com/package/angular2) said *The files under /es6 are es6 compatible files that can be transpiled to es5 using any transpiler.* So I gave it a shot.

## Babel transformer plugin

To support type annotation and property decorator without initializer, this skeleton app uses the following external Babel transform plugin that I made:

- [babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations)

## TODO

- Support source map.
