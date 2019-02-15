module.exports = () => {
  gulp.task('png-sprite', function () {
    const spriteData = gulp.src(`${config.sourcePath}/${config.pngSpriteDirectory}/*.png`)
      .pipe(plugins.png_sprite({
        imgName: 'sprite.png',
        cssName: 'png-sprite.scss',
        cssFormat: 'scss',
        algorithm: 'binary-tree',
        cssTemplate: './png-sprite-template.txt',
        cssVarMap: function (sprite) {
          sprite.name = 'icon-' + sprite.name
        }
      }));

    const destImg = spriteData.img.pipe(gulp.dest(`${config.temporaryPath}/${config.pngSpriteDirectory}`));
    const destCss = spriteData.css.pipe(gulp.dest(`${config.sourcePath}/${config.stylesDirectory}/sprites/`));
    return plugins.merge(destImg, destCss);
  });
};