module.exports = () => {
  gulp.task('generate-index', function () {
    const fs = require('fs');
    let files = fs.readdirSync(`${config.sourcePath}/views`);

    files = files.map((value) => {
      return value.split('.').slice(0, -1).join('.');
    }).filter((value) => { return value});

    files = files.filter((item) => {
      return item !== 'index';
    });

    let html = '';

    if (files.length > 0) {
      files.forEach((item) => {
        html += `<li class="pages__item"><a class="pages__link" href="/${item}.html">${item}.html</a></li>`;
      });
    } else {
      html = 'Files not found';
    }

    if (html) {
      let content = fs.readFile(`${config.sourcePath}/views/index.twig`, 'utf8', (err, data) => {
        let result = data.replace(/\{\%[\s\S]+\%\}/m, `{% block pages %}${html}{% endblock %}`);

        fs.writeFile(`${config.sourcePath}/views/index.twig`, result, 'utf8', function (err) {
          if (err) return console.log(err);
        });
      });
    }

    return gulp.src(`${config.temporaryPath}/*.html`);
  });
};