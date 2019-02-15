module.exports = () => {
  gulp.task('scripts:libraries', () => {
    return gulp.src(config.javascript_libraries)
      .pipe(plugins.concat('libraries.js'))
      .pipe(gulp.dest(`${config.temporaryPath}/${config.javascriptDirectory}`))
  });

  gulp.task('scripts', () => {
    if (config.use_babel) {
      return gulp.src(
        [
          `./${config.sourcePath}/${config.javascriptDirectory}/**`,
          `!./${config.sourcePath}/${config.javascriptDirectory}/libraries.js`
        ]
      )
        .pipe(plugins.babel({
          ignore: [
            `./${config.sourcePath}/${config.javascriptDirectory}/libs/**`,
            `!./${config.sourcePat}/${config.javascriptDirectory}/libraries.js`
          ],
        })).on('error', function (err) {
          console.error('[Compilation Error]');
          console.error(err.fileName + (err.loc ? `( ${err.loc.line}, ${err.loc.column} ): ` : ': '));
          console.error('error Babel: ' + err.message + '\n');
          console.error(err.codeFrame);
          this.emit('end');
        })
        .pipe(gulp.dest(`${config.temporaryPath}/${config.javascriptDirectory}/`))
        .pipe(plugins.browser_sync.reload({stream: true}));
    }

    return gulp.src(
      [
        `./${config.sourcePath}/${config.javascriptDirectory}/**`,
        `!./${config.sourcePath}/${config.javascriptDirectory}/libraries.js`,
      ])
      .pipe(gulp.dest(`${config.temporaryPath}/${config.javascriptDirectory}/`))
      .pipe(plugins.browser_sync.reload({stream: true}));
  });

  gulp.task('scripts:build', () => {
    let stream = gulp.src(`${config.temporaryPath}/${config.javascriptDirectory}/**/*.js`);

    if (config.concatenate_scripts) {
      stream = stream.pipe(plugins.order([
        `${config.temporaryPath}/${config.javascriptDirectory}/libraries.js`,
        `${config.temporaryPath}/${config.javascriptDirectory}/libs/*.js`,
        `${config.temporaryPath}/${config.javascriptDirectory}/**/*.j`
      ], {base: './'}))
        .pipe(plugins.concat('all.js'))
        .pipe(gulp.dest(`${config.destinationPath}/${config.javascriptDirectory}`));
    }


    if (config.js_source_maps) {
      stream = stream.pipe(plugins.source_maps.init());
    }

    if (config.concatenate_scripts) {
      stream = stream.pipe(plugins.uglify());
    }

    if (config.js_source_maps) {
      stream = stream.pipe(plugins.source_maps.write());
    }

    if (config.concatenate_scripts) {
      stream = stream.pipe(plugins.rename('all.min.js'));
    }

    stream = stream.pipe(gulp.dest(`${config.destinationPath}/${config.javascriptDirectory}`));

    return stream;
  });
};
