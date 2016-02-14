var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var connect = require('gulp-connect')


function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {

  var props = {
    entries: ['./src/js/' + file],
    debug : true,
    transform:  [babelify, reactify]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./build/'))
      //.pipe(connect.reload())
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

// run a web server
gulp.task('webserver', function() {
  connect.server({
    livereload: false,
    port: 3000
  })
});


// run once
gulp.task('scripts', function() {
  return buildScript('app.js', false);
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['scripts', 'webserver'], function() {
  return buildScript('app.js', true);
});
