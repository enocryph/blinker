module.exports = () => {
  gulp.task('styles:critical', function () {
    if (config.critical_css) {
      return gulp.src(`${config.destinationPath}/**/*.{html,htm}`)
        .pipe(plugins.critical({
          inline: false,
          base: `${config.destinationPath}/`,
          minify: true,
          css: [`${config.destinationPath}/${config.stylesDirectory}/style.css`],
          dimensions: [{
            height: 480,
            width: 320
          }, {
            height: 900,
            width: 1200
          }]
        }))
        .on('error', function (err) {
          console.error(err.message);
        })
        .pipe(gulp.dest(`${config.destinationPath}/critical/`));
    }

    return gulp.src(`${config.destinationPath}/html/**/*.html`);
  });
};