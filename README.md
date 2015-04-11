# Build Angular 2 app with babel

A skeleton Angular 2 app built with babel.

- Bundles JavaScript files into one file. No lazy loading.
- Uses babel instead of Traceur.
- Supports `@` annotation and type annotation with babel transformer plugins.
- (Very limited rtts_assert supoort)

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

## Babel transformer plugins

To support AtScript syntax of Angular 2, this skeleton app uses the following external babel transformer plugins that I made:

- [babel-plugin-angular2-at-annotation](https://github.com/shuhei/babel-plugin-angular2-at-annotation)
- [babel-plugin-angular2-type-annotation](https://github.com/shuhei/babel-plugin-angular2-type-annotation)

## TODO

- Support source map.
