module.exports = () => {
  gulp.task('styles', function () {
    return gulp.src('./' + config.sourcePath + '/' + config.stylesDirectory + '/style.scss')
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer({
        browsers: ['last 10 versions'],
        cascade: 1
      }))
      .pipe(plugins.rename('style.css'))
      .pipe(gulp.dest(config.temporaryPath + '/' + config.stylesDirectory))
      .pipe(plugins.browser_sync.reload({stream: true}));
  });

  gulp.task('styles:build', function () {
    let stream = gulp.src('./' + config.sourcePath + '/' + config.stylesDirectory + '/style.scss');

    if (config.css_source_maps) {
      stream = stream.pipe(plugins.source_maps.init());
    }

    stream = stream.pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer({
        browsers: ['last 10 versions'],
        cascade: 1
      }))
      .pipe(plugins.rename('style.css'))
      .pipe(gulp.dest(config.temporaryPath + '/' + config.stylesDirectory))
      .pipe(plugins.csso());

    if (config.css_source_maps) {
      stream = stream.pipe(plugins.source_maps.write());
    }

    stream = stream.pipe(plugins.rename('style.min.css'))
      .pipe(gulp.dest(config.temporaryPath + '/' + config.stylesDirectory))
      .pipe(plugins.browser_sync.reload({stream: true}));
    return stream;
  });

  gulp.task('styles:inline', function () {
    if (config.inline_css) {
      return gulp.src('./' + config.destinationPath + '/**/*.{html,htm}')
        .pipe(plugins.inline_css())
        .pipe(gulp.dest('./' + config.destinationPath));
    }
    return gulp.src('./' + config.destinationPath + '/**/*.html');
  });
};