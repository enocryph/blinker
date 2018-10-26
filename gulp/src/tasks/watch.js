module.exports = () => {
  blinker.gulp.task('watch', () => {
    blinker.gulp.watch([blinker.config.sourcePath + '/' + blinker.config.stylesDirectory + '/**/*.{scss, sass, css}'], blinker.gulp.series('styles'));
    blinker.gulp.watch([blinker.config.sourcePath + '/' + blinker.config.viewsDirectory + '/**/*.{twig, html}'], blinker.gulp.series('templates'));
    blinker.gulp.watch([blinker.config.sourcePath + '/' + blinker.config.javascriptDirectory + '/**/*.js'], blinker.gulp.series('scripts'));
    blinker.gulp.watch([blinker.config.sourcePath + '/' + blinker.config.pngSpriteDirectory + '/*.png'],  blinker.gulp.series('png-sprite'));
    blinker.gulp.watch(['./' + blinker.config.sourcePath + '/' + blinker.config.imagesDirectory + '/**/*'],  blinker.gulp.series('images:copy'));
  });
};