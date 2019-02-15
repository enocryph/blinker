module.exports = () => {
  gulp.task('serve', function () {
    plugins.browser_sync.init({
      notify: false,
      logPrefix: 'Blinker',
      logFileChanges: false,
      server: [config.temporaryPath, config.sourcePath],
      startPath: '/',
      logSnippet: false
    });
  });
};