"use strict";

global.gulp = require('gulp');
global.config = require('./config.json');
global.core = require('./gulp/export.js');
global.plugins = {
  twig: require('gulp-twig'),
  sass: require('gulp-sass'),
  autoprefixer: require('gulp-autoprefixer'),
  csso: require('gulp-csso'),
  browser_sync: require('browser-sync'),
  rename: require('gulp-rename'),
  delete: require('del'),
  concat: require('gulp-concat'),
  babel: require('gulp-babel'),
  png_sprite: require('gulp.spritesmith'),
  merge: require('merge-stream'),
  imagemin: require('gulp-imagemin'),
  clean: require('gulp-clean'),
  file_exist: require('files-exist'),
  uglify: require('gulp-uglify'),
  order: require('gulp-order'),
  source_maps: require('gulp-sourcemaps'),
  svg_min: require('gulp-svgmin'),
  svg_sprite: require('gulp-svg-sprite'),
  cheerio: require('gulp-cheerio'),
  replace: require('gulp-replace'),
  inline_css: require('gulp-inline-css'),
  obfuscator: require('gulp-javascript-obfuscator'),
  iconfont: require('gulp-iconfont'),
  iconfontCss: require('gulp-iconfont-css'),
};

core.forEach(taskPath => {
  require(taskPath)()
});

if (config.critical_css) {
  plugins.critical = require('critical').stream;
}

core.errorHandler.initialize();

gulp.task('dev', gulp.series(
  gulp.parallel('clean'),
  gulp.parallel('iconic'),
  gulp.parallel('png-sprite', 'images:copy', 'fonts:copy', 'svg:sprite', 'svg:inline', 'generate-index'),
  gulp.parallel('templates', 'styles', 'scripts:libraries', 'scripts'),
  gulp.parallel('watch', 'serve')
));

gulp.task('build', gulp.series(
  gulp.parallel('clean'),
  gulp.parallel('iconic'),
  gulp.parallel('png-sprite', 'images:copy', 'fonts:copy', 'svg:sprite', 'svg:inline', 'generate-index'),
  gulp.parallel('images:minify', 'templates', 'styles:build', 'scripts:libraries', 'scripts'),
  gulp.parallel('dist', 'scripts:build'),
  gulp.parallel('styles:inline', 'scripts:replace'),
  gulp.parallel('styles:critical'),
));

