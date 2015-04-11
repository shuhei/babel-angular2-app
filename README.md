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

## TODO

- Support source map.
