import {join} from 'path';

export = function buildSass(gulp:any, plugins:any, option:any) {
  return function () {
    return gulp.src([
          join('./', '**/*.scss'),
          '!' + join('node_modules', '**/*.scss'),
          '!' + join('dist', '**/*.scss'),
          '!' + join('out', '**/*.scss'),
          '!' + join('tools', '**/*.scss'),
          '!' + join('typings', '**/*.scss')
        ])
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(gulp.dest('./'));
  };
};
