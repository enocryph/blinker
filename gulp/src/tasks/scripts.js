module.exports = () => {
  gulp.task('scripts:libraries', () => {
    if (config.javascript_libraries.length) {
      return gulp.src(config.javascript_libraries)
        .pipe(plugins.concat('libraries.js'))
        .pipe(gulp.dest(`${config.temporaryPath}/${config.javascriptDirectory}`))
    }
    return gulp.src(`${config.temporaryPath}/`);
  });

  gulp.task('scripts', () => {
    if (config.js_custom_build_order) {
      for (let i = 0; i < config.js_custom_build_order.length; i++) {
        let script = config.js_custom_build_order[i];
        let source = [];
        if (Array.isArray(script.src)) {
          for (let j = 0; j < script.src.length; j++) {
            source[j] = `./${config.sourcePath}/${config.javascriptDirectory}/${script.src[j]}`
          }
        } else {
          source = `./${config.sourcePath}/${config.javascriptDirectory}/${script.src}`;
        }

        if (script.use_babel) {
          gulp.src(source)
            .pipe(plugins.babel()).on('error', function (err) {
            console.error('[Compilation Error]');
            console.error(err.fileName + (err.loc ? `( ${err.loc.line}, ${err.loc.column} ): ` : ': '));
            console.error('error Babel: ' + err.message + '\n');
            console.error(err.codeFrame);
            this.emit('end');
          })
            .pipe(gulp.dest(`${config.temporaryPath}/${config.javascriptDirectory}/`))
            .pipe(plugins.browser_sync.reload({stream: true}));
        } else {
          gulp.src(source)
            .pipe(gulp.dest(`${config.temporaryPath}/${config.javascriptDirectory}/`))
            .pipe(plugins.browser_sync.reload({stream: true}));
        }
      }

      return gulp.src(`${config.temporaryPath}/${config.javascriptDirectory}/**/*.js`);
    } else {
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
              `!./${config.sourcePath}/${config.javascriptDirectory}/libraries.js`
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
    }

  });

  gulp.task('scripts:build', () => {
    let stream;

    if (!config.js_custom_build_order.length) {
      stream = gulp.src(`${config.temporaryPath}/${config.javascriptDirectory}/**/*.js`);
      if (config.concatenate_scripts) {
        stream = stream.pipe(plugins.order([
          `${config.temporaryPath}/${config.javascriptDirectory}/libraries.js`,
          `${config.temporaryPath}/${config.javascriptDirectory}/libs/*.js`,
          `${config.temporaryPath}/${config.javascriptDirectory}/**/*.j`
        ], {base: './'}))
          .pipe(plugins.concat('all.js'))
          .pipe(gulp.dest(`${config.destinationPath}/${config.javascriptDirectory}`));
      }

      if (config.obfuscate) {
        stream = stream.pipe(plugins.obfuscator(config.obfuscate_options));
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
    } else {
      for (let i = 0; i < config.js_custom_build_order.length; i++) {
        let script = config.js_custom_build_order[i];
        let source = [];
        if (Array.isArray(script.src)) {
          for (let j = 0; j < script.src.length; j++) {
            source[j] = `${config.temporaryPath}/${config.javascriptDirectory}/${script.src[j]}`
          }
        } else {
          source = `${config.temporaryPath}/${config.javascriptDirectory}/${script.src}`;
        }

        stream = gulp.src(source);

        if (script.concatenate) {
          stream = stream.pipe(plugins.order(source, {base: './'}))
            .pipe(plugins.concat(script.only_result_file ? script.name.replace(/\.js/gm, ".min.js") : script.name))
            .pipe(gulp.dest(`${config.destinationPath}/${config.javascriptDirectory}`));
        }

        if (script.obfuscate) {
          stream = stream.pipe(plugins.obfuscator(script.obfuscate_options));
        }

        if (script.source_maps) {
          stream = stream.pipe(plugins.source_maps.init());
        }

        if (script.concatenate) {
          stream = stream.pipe(plugins.uglify());
        }

        if (script.source_maps) {
          stream = stream.pipe(plugins.source_maps.write());
        }

        if (script.concatenate) {
          stream = stream.pipe(plugins.rename(script.name.replace(/\.js/gm, ".min.js")));
        }

        stream = stream.pipe(gulp.dest(`${config.destinationPath}/${config.javascriptDirectory}/`));
      }
    }


    return stream;
  });

  gulp.task('scripts:replace', () => {
    if (config.concatenate_scripts) {
      gulp.src(`${config.destinationPath}/*.{html,htm}`).pipe(plugins.cheerio({
        run: function ($) {
          $('script[src]').remove();
          $('body').append('<script src="js/all.min.js"></script>')
        },
        parserOptions: {
          decodeEntities: false
        },
      })).pipe(gulp.dest(`${config.destinationPath}/`));
    }
    return gulp.src(`${config.destinationPath}/`);
  });
};
