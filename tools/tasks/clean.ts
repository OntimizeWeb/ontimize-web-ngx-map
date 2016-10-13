import * as async from 'async';
import * as util from 'gulp-util';
import * as chalk from 'chalk';
import * as del from 'del';
import {join} from 'path';
import {APP_SRC, APP_DEST, TMP_DIR, OUT_DIR} from '../config';

export = function clean(gulp:any, plugins:any, option:any) {
  return function (done:any) {

    switch(option) {
      case 'all'    : cleanAll(done);     break;
      case 'dist'   : cleanDist(done);    break;
      case 'tmp'    : cleanTmp(done);     break;
      case 'out'    : cleanOut(done);     break;
      case 'css'    : cleanCSSFiles(done); break;
      default: done();
    }

  };
};

function cleanAll(done:any) {
  async.parallel([
    cleanDist,
    cleanTmp,
    cleanOut
  ], done);
}
function cleanDist(done:any) {
  del(APP_DEST).then((paths) => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });
}
function cleanTmp(done:any) {
  del(TMP_DIR).then((paths) => {
    util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });
}
function cleanOut(done: any) {
  del([
    join(OUT_DIR, 'src/**'),
    join(OUT_DIR, '**/*.*'),
    '!' + join(OUT_DIR, '.git')
  ]).then((paths) => {
    // util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));
    done();
  });

}

function cleanCSSFiles(done:any) {
  del([
   join(APP_SRC, '**', '*.css')
  ]).then((paths) => {
    /*util.log('Deleted', chalk.yellow(paths && paths.join(', ') || '-'));*/
    done();
  });
}

