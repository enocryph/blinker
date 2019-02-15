module.exports = () => {
  gulp.task('images:minify', () => {
    if (!config.minify_images) {
      return gulp.src([
        `${config.sourcePath}/${config.imagesDirectory}/**/*.{png,jpg,gif}`,
        `!./${config.sourcePath}/${config.imagesDirectory}/png_sprite/**/*`,
      ])
        .pipe(gulp.dest(config.temporaryPath + '/' + config.imagesDirectory));
    }

    return gulp.src([
      `${config.sourcePath}/${config.imagesDirectory}/**/*.{png,jpg,gif}`,
      `!./${config.sourcePath}/${config.imagesDirectory}/png_sprite/**/*`,
    ])
      .pipe(plugins.imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5
      }))
      .pipe(gulp.dest(`${config.temporaryPath}/${config.imagesDirectory}`));
  });
};