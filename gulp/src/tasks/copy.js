module.exports = () => {
  blinker.gulp.task('images:copy', function () {
    return blinker.gulp.src(
      [
        './' + blinker.config.sourcePath + '/' + blinker.config.imagesDirectory + '/**/*',
        '!./' + blinker.config.sourcePath + '/' + blinker.config.imagesDirectory + '/png_sprite/**/*',
      ]
    )
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.imagesDirectory))
      .pipe(blinker.plugins.browser_sync.reload({stream: true}));
  });
};