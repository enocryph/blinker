module.exports = () => {
  gulp.task('screenshot', function () {
    const fs = require('fs');
    let files = fs.readdirSync(`${config.temporaryPath}/`);

    files = files.map((value) => {
      return value.split('.').slice(0, -1).join('.');
    }).filter((value) => { return value});

    let notExistingFiles = [];

    files.forEach((filename) => {
      if (!fs.existsSync(`${config.sourcePath}/${config.imagesDirectory}/pages/${filename}.png`)) {
        notExistingFiles.push(`${config.temporaryPath}/${filename}.html`);
      }
    });

    if (notExistingFiles.length) {
      return gulp.src(notExistingFiles)
        .pipe(plugins.webshot({
          dest: `${config.sourcePath}/${config.imagesDirectory}/pages/`,
          root: config.temporaryPath
        }));
    }

    return gulp.src(`${config.temporaryPath}/*.html`);
  });
};