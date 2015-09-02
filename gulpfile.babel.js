import gulp from 'gulp';
import gutil, { PluginError } from 'gulp-util';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';

import del from 'del';

gulp.task('copy', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('public'));
});

gulp.task('build', ['copy'], () => {
  const b = browserify('src/app.js')
    .transform(babelify);
  return bundle(b);
});

gulp.task('watch', () => {
  const b = browserify('src/app.js', watchify.args)
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
      const pe = new PluginError('browserify', e);
      console.log(pe.toString());
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public'));
}
