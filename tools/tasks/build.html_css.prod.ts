import * as merge from 'merge-stream';
import {join} from 'path';
import {
  APP_SRC,
  TMP_DIR,
  CSS_PROD_BUNDLE,
  CSS_DEST
} from '../config';

export = function buildHTML_CSS(gulp:any, plugins:any) :any {
  return function () {

    return merge(minifyComponentCss(), prepareTemplates());

    function prepareTemplates() {
      return gulp.src(join(APP_SRC, '**', '*.html'))
        .pipe(gulp.dest(TMP_DIR));
    }

    function minifyComponentCss() {
      return gulp.src([
          join(APP_SRC, '**', '*.css')
        ])
        .pipe(plugins.cssnano())
        .pipe(gulp.dest(TMP_DIR));
    }

  };
};
