module.exports = () => {
  gulp.task('images:copy', function () {
    return gulp.src(
      [
        `./${config.sourcePath}/${config.imagesDirectory}/**/*`,
        `!./${config.sourcePath}/${config.pngSpriteDirectory}/**/*`,
        `!./${config.sourcePath}/${config.svgSpriteDirectory}/**/*`,
        `!./${config.sourcePath}/${config.svgInlineSpriteDirectory}/**/*`,
      ]
    )
      .pipe(gulp.dest(config.temporaryPath + '/' + config.imagesDirectory))
      .pipe(plugins.browser_sync.reload({stream: true}));
  });

  gulp.task('fonts:copy', function () {
    return gulp.src([`./${config.sourcePath}/${config.fontsDirectory}/**/*`])
      .pipe(gulp.dest(`${config.temporaryPath}/${config.fontsDirectory}`))
      .pipe(plugins.browser_sync.reload({stream: true}));
  });

  gulp.task('dist', function () {
    return gulp.src(
      [
        `./${config.temporaryPath}/**/*`,
        `!./${config.temporaryPath}/${config.javascriptDirectory}/**/*`,
      ]
    )
      .pipe(gulp.dest(`${config.destinationPath}/`))
  });
};