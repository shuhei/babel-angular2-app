# Build Angular 2 app with babel

- Bundle app into one file. No lazy loading.
- Use babel instead of Traceur.
- `@` annotation and type annotation transformer for babel.

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

- Split app.js and lib.js for faster build.
- Support rtts_assert.
- Support source map.
