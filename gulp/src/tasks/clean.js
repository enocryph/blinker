module.exports = () => {
  gulp.task('clean',
    plugins.delete.bind(null, [config.destinationPath, config.temporaryPath], {dot: true})
  );
};