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
    let stream = blinker.gulp.src('./' + blinker.config.sourcePath + '/' + blinker.config.stylesDirectory + '/style.scss');

    if (blinker.config.css_source_maps) {
      stream = stream.pipe(blinker.plugins.source_maps.init());
    }

    stream = stream.pipe(blinker.plugins.sass().on('error', blinker.plugins.sass.logError))
      .pipe(blinker.plugins.autoprefixer({
        browsers: ['last 10 versions'],
        cascade: 1
      }))
      .pipe(blinker.plugins.rename('style.css'))
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.stylesDirectory))
      .pipe(blinker.plugins.csso());

    if (blinker.config.css_source_maps) {
      stream = stream.pipe(blinker.plugins.source_maps.write());
    }

    stream = stream.pipe(blinker.plugins.rename('style.min.css'))
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.stylesDirectory))
      .pipe(blinker.plugins.browser_sync.reload({stream: true}));
    return stream;
  });
};