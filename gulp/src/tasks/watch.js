module.exports = () => {
  gulp.task('watch', () => {
    gulp.watch(
      [
        `${config.sourcePath}/${config.stylesDirectory}/**/*.scss`,
        `${config.sourcePath}/${config.stylesDirectory}/**/*.sass`,
        `${config.sourcePath}/${config.stylesDirectory}/**/*.css`
      ],
      gulp.series('styles'));
    gulp.watch(
      [
        `${config.sourcePath}/${config.viewsDirectory}/**/*.twig`,
        `${config.sourcePath}/${config.viewsDirectory}/**/*.html`,
        `${config.sourcePath}/${config.viewsDirectory}/**/*.htm`
      ],
      gulp.series('templates'));
    gulp.watch(
      [
        `./${config.sourcePath}/${config.javascriptDirectory}/**/*.js`,
        `!./${config.sourcePath}/${config.javascriptDirectory}/libraries.js`
      ],
      gulp.series('scripts'));
    gulp.watch([`${config.sourcePath}/${config.pngSpriteDirectory}/*.png`], gulp.series('png-sprite'));
    gulp.watch([`./${config.sourcePath}/${config.imagesDirectory}/**/*`], gulp.series('images:copy'));
    gulp.watch([`./${config.sourcePath}/${config.fontsDirectory}/**/*`], gulp.series('fonts:copy'));
    gulp.watch([`./${config.sourcePath}/${config.svgSpriteDirectory}/**/*.svg`], gulp.series('svg:sprite'));
    gulp.watch([`./${config.sourcePath}/${config.svgInlineSpriteDirectory}/**/*.svg`], gulp.series('svg:inline'));
  });
};