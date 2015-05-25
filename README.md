# Build Angular 2 app with babel

A skeleton Angular 2 app built with babel.

- Bundles JavaScript files into one file. No lazy loading.
- Uses babel instead of Traceur.
- Supports class/parameter decorator and parameter type metadata with babel and a babel transformer plugin.
- Limited support of rtts_assert.

## Try

Build

```
npm install
make
```

Preview

```
npm install -g http-server
http-server public
```

## Motivation

`angular/quickstart` provides us to try Angular 2 app with on-the-fly transpilation and lazy-loading, which result in long waiting time for each file change. Also, I'm not familiar with the Traceur tool stack and its output. [angular2 npm package](https://www.npmjs.com/package/angular2) says *The files under /es6 are es6 compatible files that can be transpiled to es5 using any transpiler.* So I gave it a shot.

## Babel transformer plugin

To support parameter decorator and parameter type metadata of Angular 2, this skeleton app uses the following external babel transformer plugin that I made:

- [babel-plugin-angular2-annotations](https://github.com/shuhei/babel-plugin-angular2-annotations)

## TODO

- Support source map.

## Problems

### rtts_assert and webpack

rtts_assert has a function named `define`. Webpack tries to treat `define()` as an AMD call. Currently renaming them with a babel transformer.

### angular2 alpha.22

- In `angular2/dev/es6/src/facade/async.es6`, `if (Rx.hasOwnProperty('default')) {` doesn't work with babel. Tentatively added a dirty hack with postinstall script.
