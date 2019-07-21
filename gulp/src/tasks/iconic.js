module.exports = () => {
  gulp.task('iconic', function () {
    const runTimestamp = Math.round(Date.now() / 1000);

    return gulp.src([`${config.sourcePath}/${config.iconicFontDirectory}/**/*.svg`]) // Source folder containing the SVG images
      .pipe(plugins.iconfontCss({
        fontName: 'Iconic', // The name that the generated font will have
        path: 'iconic.txt', // The path to the template that will be used to create the SASS/LESS/CSS file
        targetPath: '../../styles/sprites/iconic.scss', // The path where the file will be generated
        fontPath: `../${config.fontsDirectory}/iconic/`, // The path to the icon font file
        cssClass: 'iconic',
      }))
      .pipe(plugins.iconfont({
        prependUnicode: false, // Recommended option
        fontName: 'Iconic', // Name of the font
        formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // The font file formats that will be created
        normalize: true,
        timestamp: runTimestamp // Recommended to get consistent builds when watching files
      }))
      .pipe(gulp.dest(`${config.sourcePath}/${config.fontsDirectory}/iconic/`));
  });
};