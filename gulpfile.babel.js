import gulp from 'gulp';
import gutil, { PluginError } from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';

import assign from 'object-assign';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';

import del from 'del';

const isProduction = process.env.NODE_ENV === 'production';

gulp.task('copy', () => {
  return gulp.src([
    'src/index.html',
    'node_modules/angular2/bundles/angular2-polyfills.min.js'
  ])
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['copy'], () => {
  const b = browserify('src/index.js', { debug: true })
    .transform(babelify);
  return bundle(b);
});

gulp.task('watch', () => {
  const b = browserify('src/index.js', assign({ debug: true }, watchify.args))
    .transform(babelify);
  const w = watchify(b)
    .on('update', () => bundle(w))
    .on('log', gutil.log);
  return bundle(w)
});

gulp.task('clean', () => {
  return del('public');
});

gulp.task('default', ['copy', 'watch']);

function bundle(b) {
  return b.bundle()
    .on('error', (e) => {
      console.error(e.stack);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public'));
}
