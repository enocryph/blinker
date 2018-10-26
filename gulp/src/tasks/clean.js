module.exports = () => {
  blinker.gulp.task('clean',
    blinker.plugins.delete.bind(null, [blinker.config.destinationPath, blinker.config.temporaryPath], {dot: true})
  );
};