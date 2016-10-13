import { OUT_DIR} from '../config';
import {templateLocals, tsProjectFn} from '../utils';
import * as merge from 'merge-stream';

export = function buildJSMainOut(gulp:any, plugins:any) :any {
  let tsProject = tsProjectFn(plugins);

  return function() {

    let mainResult = gulp.src([
        'tools/manual_typings/manual.typings.d.ts',
        'typings/browser.d.ts',
        'o-map.ts'
      ])
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.typescript(tsProject));

    return merge(getMainJS(), getMainDefinition());

    function getMainJS() {
     return  mainResult.js
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.template(templateLocals()))
        .pipe(gulp.dest(OUT_DIR));
    }

    function getMainDefinition() {
      return mainResult.dts
      .pipe(plugins.template(templateLocals()))
      .pipe(gulp.dest(OUT_DIR));
    }
  };
};
