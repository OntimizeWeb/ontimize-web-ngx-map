const gulp = require('gulp');
const sass = require('node-sass');
const inlineTemplates = require('gulp-inline-ng2-template');
// const exec = require('child_process').exec;
const copyfiles = require('copyfiles');
const cssimport = require("gulp-cssimport");
// const replace = require('gulp-replace');
const replace = require('gulp-ext-replace');

const SCSS_CONF = {
  SRC: './tmp/styles.scss',
  DIST: './dist'
};

gulp.task('map-styles-copy', (callback) => {
  copyfiles(['./styles.scss', './tmp'], true, callback);
});

gulp.task('styles-creation', (callback) => {
  return gulp.src(SCSS_CONF.SRC)
    .pipe(cssimport(SCSS_CONF.OPTIONS))
    .pipe(gulp.dest(SCSS_CONF.DIST));
});

gulp.task('styles', gulp.series('map-styles-copy', 'styles-creation'));

const FILES = [
  'CHANGELOG.md',
  'LICENSE',
  'README.md',
  'package.json',
  'ontimize.scss',
  '.npmignore',
  'dist'
];

/**
 * DEPENDENCIES
 */
const LEAFLET_IMAGES = [
  'node_modules/leaflet/dist/images/*',
  'dist/images'
];

gulp.task('copy.leaflet.images', (callback) => {
  copyfiles(LEAFLET_IMAGES, true, callback);
});


const LEAFLET_FILES = [
  'node_modules/leaflet/dist/leaflet.css',
  'node_modules/leaflet.markercluster/dist/MarkerCluster.css',
  'node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
  'node_modules/leaflet-contextmenu/dist/leaflet.contextmenu.css',
  'tmp/assets/dependencies/leaflet'
];

gulp.task('copy.leaflet.assets', (callback) => {
  copyfiles(LEAFLET_FILES, true, callback);
});


gulp.task('copy-dependencies-assets', (callback) => {
  return gulp.src('./tmp/assets/dependencies/**/*.css')
    .pipe(replace('.scss'))
    .pipe(gulp.dest('./tmp/assets/dependencies/'))
});

gulp.task('copy-files-array', (callback) => {
  copyfiles(FILES, true, callback);
});

/**
 * LEAFLET DRAW
 */
const LEAFLET_DRAW_IMAGES = [
  'node_modules/leaflet-draw/dist/images/*',
  'dist/images'
];

gulp.task('copy.leaflet.draw.images', (callback) => {
  copyfiles(LEAFLET_DRAW_IMAGES, true, callback);
});

const LEAFLET_CONTEXTMENU_IMAGES = [
  'src/images/contextmenu/*',
  'dist/images/'
];

gulp.task('copy.leaflet-contextmenu.images', (callback) => {
  copyfiles(LEAFLET_CONTEXTMENU_IMAGES, true, callback);
});

const LEAFLET_DRAW_FILES = [
  'node_modules/leaflet-draw/dist/leaflet.draw.css',
  'tmp/assets/dependencies/leaflet'
];

gulp.task('copy.leaflet.draw.assets', (callback) => {
  copyfiles(LEAFLET_DRAW_FILES, true, callback);
});


gulp.task('copy-files',
  gulp.series('copy-files-array',
    'copy.leaflet.images',
    'copy.leaflet.assets',
    'copy.leaflet.draw.images',
    'copy.leaflet.draw.assets',
    'copy-dependencies-assets',
    'copy.leaflet-contextmenu.images')
);


/**
 * Inline templates configuration.
 * @see  https://github.com/ludohenin/gulp-inline-ng2-template
 */

/**
* Compile SASS to CSS.
* @see https://github.com/ludohenin/gulp-inline-ng2-template
* @see https://github.com/sass/node-sass
*/
function compileSass(path, ext, file, callback) {
  let compiledCss = sass.renderSync({
    file: path,
    outputStyle: 'compressed',
  });
  callback(null, compiledCss.css);
}

const INLINE_TEMPLATES_CONF = {
  SRC: ['./**/*.ts', '!./tmp/**/*', '!./node_modules/**/*', '!./custom-typings.d.ts'],
  DIST: './tmp',
  CONFIG: {
    base: '.',
    target: 'es6',
    useRelativePaths: true,
    styleProcessor: compileSass
  }
};

/**
 * Inline external HTML and SCSS templates into Angular component files.
 * @see: https://github.com/ludohenin/gulp-inline-ng2-template
 */
gulp.task('inline-templates', () => {
  return gulp.src(INLINE_TEMPLATES_CONF.SRC)
    .pipe(inlineTemplates(INLINE_TEMPLATES_CONF.CONFIG))
    .pipe(gulp.dest(INLINE_TEMPLATES_CONF.DIST));
});
