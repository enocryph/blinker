module.exports = () => {
  gulp.task('templates', function () {
    if (config.template_engine === 'twig') {
      return gulp.src(`${config.sourcePath}/${config.viewsDirectory}/*.twig`)
        .pipe(plugins.twig({trace: false, debug: false}))
        .pipe(gulp.dest(`${config.temporaryPath}`))
        .pipe(plugins.browser_sync.reload({stream: true}));

    } else if (config.template_engine === 'html') {
      return gulp.src([
        `${config.sourcePath}/${config.viewsDirectory}/*.{html,htm}`,
      ])
        .pipe(gulp.dest(`${config.temporaryPath}`))
        .pipe(plugins.browser_sync.reload({stream: true}));
    }
  });
};