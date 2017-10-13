const gulp = require('gulp');
const sass = require('node-sass');
const inlineTemplates = require('gulp-inline-ng2-template');
const exec = require('child_process').exec;
const htmlMinifier = require("html-minifier");/*!!!!*/
const copyfiles = require('copyfiles');
const cssimport = require("gulp-cssimport");
const replace = require('gulp-replace');

const SCSS_CONF = {
  SRC: './styles.scss',
  OPTIONS: {
    matchPattern: "!leaflet/*"
  },
  DIST: './dist'
};

gulp.task('map.styles', (callback) => {
  return gulp.src(SCSS_CONF.SRC)
    .pipe(cssimport(SCSS_CONF.OPTIONS))
    .pipe(gulp.dest(SCSS_CONF.DIST));
});

const FILES = [
  'CHANGELOG.md',
  'LICENSE',
  'README.md',
  'package.json',
  'ontimize.scss',
  '.npmignore',
  'dist'
];

gulp.task('copy-files', ['copy.leaflet.assets', 'copy.leaflet.draw.assets'], (callback) => {
  copyfiles(FILES, true, callback);
});

/**
 * LEAFLET
 */
const LEAFLET_FILES = [
  'node_modules/leaflet/dist/leaflet.css',
  'node_modules/leaflet.markercluster/dist/MarkerCluster.css',
  'node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css',
  'dist/assets/leaflet'
];

gulp.task('copy.leaflet.assets', ['copy.leaflet.images'], (callback) => {
  copyfiles(LEAFLET_FILES, true, callback);
});

const LEAFLET_IMAGES = [
  'node_modules/leaflet/dist/images/*',
  'dist/assets/leaflet/images'
];

gulp.task('copy.leaflet.images', (callback) => {
  copyfiles(LEAFLET_IMAGES, true, callback);
});

/**
 * LEAFLET DRAW
 */
const LEAFLET_DRAW_FILES = [
  'node_modules/leaflet-draw/dist/leaflet.draw.css',
  'dist/assets/leaflet'
];

gulp.task('copy.leaflet.draw.assets', ['copy.leaflet.draw.images'], (callback) => {
  copyfiles(LEAFLET_DRAW_FILES, true, callback);
});

const LEAFLET_DRAW_IMAGES = [
  'node_modules/leaflet-draw/dist/images/*',
  'dist/assets/leaflet/images'
];

gulp.task('copy.leaflet.draw.images', (callback) => {
  copyfiles(LEAFLET_DRAW_IMAGES, true, callback);
});

/**
 * Inline templates configuration.
 * @see  https://github.com/ludohenin/gulp-inline-ng2-template
 */
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
