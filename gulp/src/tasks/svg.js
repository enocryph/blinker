module.exports = () => {
  gulp.task('svg:sprite', function () {
    return gulp.src(`${config.sourcePath}/${config.svgSpriteDirectory}/**/*.svg`)
      .pipe(plugins.svg_min())
      .pipe(plugins.svg_sprite({
        mode: {
          css: {
            "spacing": {
              "padding": 5
            },
            layout: "diagonal",
            dest: "./",
            sprite: `${config.temporaryPath}/${config.svgSpriteDirectory}/sprite.svg`,
            bust: false,
            render: {
              "scss": {
                "dest": `${config.sourcePath}/${config.stylesDirectory}/sprites/svg-sprite.scss`,
                "template": "./svg-sprite-template.txt"
              }
            }
          }
        }
      }))
      .pipe(gulp.dest("./"));
  });

  gulp.task('svg:inline', function () {
    return gulp.src(`${config.sourcePath}/${config.svgInlineSpriteDirectory}/**/*.svg`)
      .pipe(plugins.svg_min({
        js2svg: {
          pretty: true
        }
      }))
      .pipe(plugins.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
          $('title').remove();
          $('style').remove();
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe(plugins.replace('&gt;', '>'))
      .pipe(plugins.svg_sprite({
        mode: {
          symbol: {
            dest: './',
            example: false,
            bust: false,
            sprite: `${config.temporaryPath}/${config.svgInlineSpriteDirectory}/sprite_inline.svg`,
            inline: false,
            render: {
              scss: {
                dest: `${config.sourcePath}/${config.stylesDirectory}/sprites/svg-sprite-inline.scss`,
                template: "./svg-sprite-inline-template.txt"
              }
            }
          }
        }
      }))
      .pipe(gulp.dest("./"));
  });
};