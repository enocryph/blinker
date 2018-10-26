module.exports = () => {
  blinker.gulp.task('scripts:libraries', () => {
    return blinker.gulp.src(blinker.config.javascript_libraries)
      .pipe(blinker.plugins.concat('libraries.js'))
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.javascriptDirectory))
  });

  blinker.gulp.task('scripts', () => {
    if (blinker.config.use_babel) {
      return blinker.gulp.src(['./' + blinker.config.sourcePath + '/' + blinker.config.javascriptDirectory + '/**'])
        .pipe(blinker.plugins.babel({
          ignore: ['./' + blinker.config.sourcePath + '/' + blinker.config.javascriptDirectory + '/libs/**'],
        })).on('error', function (err) {
          console.error('[Compilation Error]');
          console.error(err.fileName + (err.loc ? `( ${err.loc.line}, ${err.loc.column} ): ` : ': '));
          console.error('error Babel: ' + err.message + '\n');
          console.error(err.codeFrame);
          this.emit('end');
        })
        .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.javascriptDirectory + '/'))
        .pipe(blinker.plugins.browser_sync.reload({stream: true}));
    }

    return $.gulp.src(['./' + blinker.config.sourcePath + '/' + blinker.config.javascriptDirectory + '/**'])
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.javascriptDirectory + '/'))
      .pipe(blinker.plugins.browser_sync.reload({stream: true}));
  });

  blinker.gulp.task('scripts:build', () => {
    return blinker.gulp.src(blinker.config.temporaryPath + '/' + blinker.config.javascriptDirectory + '/**/*.js')
      .pipe(blinker.plugins.order([
        blinker.config.temporaryPath + '/' + blinker.config.javascriptDirectory + '/libraries.js',
        blinker.config.temporaryPath + '/' + blinker.config.javascriptDirectory + '/libs/*.js',
        blinker.config.temporaryPath + '/' + blinker.config.javascriptDirectory + '/**/*.js'
      ],  { base: './' }))
      .pipe(blinker.plugins.concat('all.js'))
      .pipe(blinker.gulp.dest(blinker.config.destinationPath + '/' + blinker.config.javascriptDirectory))
      .pipe(blinker.plugins.uglify())
      .pipe(blinker.plugins.rename('all.min.js'))
      .pipe(blinker.gulp.dest(blinker.config.destinationPath + '/' + blinker.config.javascriptDirectory))
  });
};
