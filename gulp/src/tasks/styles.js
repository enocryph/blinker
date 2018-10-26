module.exports = () => {
  blinker.gulp.task('styles', function () {
    return blinker.gulp.src('./' + blinker.config.sourcePath + '/' + blinker.config.stylesDirectory + '/style.scss')
      .pipe(blinker.plugins.sass().on('error', blinker.plugins.sass.logError))
      .pipe(blinker.plugins.autoprefixer({
        browsers: ['last 10 versions'],
        cascade: 1
      }))
      .pipe(blinker.plugins.rename('style.css'))
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.stylesDirectory))
      .pipe(blinker.plugins.browser_sync.reload({stream: true}));
  });

  blinker.gulp.task('styles:build', function () {
    return blinker.gulp.src('./' + blinker.config.sourcePath + '/' + blinker.config.stylesDirectory + '/style.scss')
      .pipe(blinker.plugins.sass().on('error', blinker.plugins.sass.logError))
      .pipe(blinker.plugins.autoprefixer({
        browsers: ['last 10 versions'],
        cascade: 1
      }))
      .pipe(blinker.plugins.rename('style.css'))
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.stylesDirectory))
      .pipe(blinker.plugins.csso())
      .pipe(blinker.plugins.rename('style.min.css'))
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.stylesDirectory))
      .pipe(blinker.plugins.browser_sync.reload({stream: true}));
  });
};