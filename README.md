# Build Angular 2 app with Babel

A skeleton [Angular 2](https://angular.io/) app built with [Babel](https://babeljs.io/) and [Browserify](http://browserify.org/).

- Uses Babel instead of [TypeScript](http://www.typescriptlang.org/)/[Traceur](https://github.com/google/traceur-compiler).
- Supports class/parameter decorators and parameter type annotations with Babel and a Babel transformer plugin.
- Bundles JavaScript files into one file with Browserify. (However, it doesn't use any Browserify-specific technology. You can easily switch to Webpack and etc.)

## Try

### Install

Clone/fork this repo and:

```
npm install -g gulp-cli
npm install
```

### Build

```
gulp build
```

### Watch

```
gulp
```

### Preview

```
npm install -g http-server
http-server public
```

## Motivation

Back in the time of angular2 alpha.18, `angular/quickstart` provided us to try Angular 2 app with on-the-fly transpilation and lazy-loading, which resulted in long waiting time for each file change. Also, I was not familiar with the Traceur tool stack and its output. [angular2 npm package](https://www.npmjs.com/package/angular2) said *The files under /es6 are es6 compatible files that can be transpiled to es5 using any transpiler.* So I gave it a shot.

## Babel transformer plugin

To support parameter decorator and parameter type metadata of Angular 2, this skeleton app uses the following external Babel transformer plugin that I made:

- [babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations)

## TODO

- Support source map.
