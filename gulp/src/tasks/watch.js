module.exports = () => {
  gulp.task('watch', () => {
    gulp.watch(
      [
        `${config.sourcePath}/${config.stylesDirectory}/**/*.scss`,
        `${config.sourcePath}/${config.stylesDirectory}/**/*.sass`,
        `${config.sourcePath}/${config.stylesDirectory}/**/*.css`
      ],
      {usePolling: true},
      gulp.series('styles'));
    gulp.watch(
      [
        `${config.sourcePath}/${config.viewsDirectory}/**/*.twig`,
        `${config.sourcePath}/${config.viewsDirectory}/**/*.html`,
        `${config.sourcePath}/${config.viewsDirectory}/**/*.htm`,
        `!${config.sourcePath}/${config.viewsDirectory}/index.twig`,
      ],
      {usePolling: true},
      gulp.series('generate-index', 'templates'));
    gulp.watch(
      [
        `./${config.sourcePath}/${config.javascriptDirectory}/**/*.js`,
        `!./${config.sourcePath}/${config.javascriptDirectory}/libraries.js`
      ],
      {usePolling: true},
      gulp.series('scripts'));
    gulp.watch([`${config.sourcePath}/${config.pngSpriteDirectory}/*.png`], {usePolling: true}, gulp.series('png-sprite'));
    gulp.watch([`./${config.sourcePath}/${config.imagesDirectory}/**/*`], {usePolling: true}, gulp.series('images:copy'));
    gulp.watch([`./${config.sourcePath}/${config.fontsDirectory}/**/*`], {usePolling: true}, gulp.series('fonts:copy'));
    gulp.watch([`./${config.sourcePath}/${config.svgSpriteDirectory}/**/*.svg`], {usePolling: true}, gulp.series('svg:sprite'));
    gulp.watch([`./${config.sourcePath}/${config.svgInlineSpriteDirectory}/**/*.svg`], {usePolling: true}, gulp.series('svg:inline'));
    gulp.watch([`./${config.sourcePath}/${config.iconicFontDirectory}/**/*.svg`], {usePolling: true}, gulp.series('iconic'));
  });
};