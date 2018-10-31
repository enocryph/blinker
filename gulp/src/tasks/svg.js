module.exports = () => {
  blinker.gulp.task('svg:sprite', function () {
    return blinker.gulp.src(`${blinker.config.sourcePath}/${blinker.config.svgSpriteDirectory}/**/*.svg`)
      .pipe(blinker.plugins.svg_min())
      .pipe(blinker.plugins.svg_sprite({
        mode: {
          css: {
            "spacing": {
              "padding": 5
            },
            layout: "diagonal",
            dest: "./",
            sprite: `${blinker.config.temporaryPath}/${blinker.config.svgSpriteDirectory}/sprite.svg`,
            bust: false,
            render: {
              "scss": {
                "dest": `${blinker.config.sourcePath}/${blinker.config.stylesDirectory}/svg-sprite.scss`,
                "template": "./svg-sprite-template.txt"
              }
            }
          }
        }
      }))
      .pipe(blinker.gulp.dest("./"));
  });
};