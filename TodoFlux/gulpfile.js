
var babelify    = require('babelify')
var browserify  = require('browserify')
var gulp        = require('gulp')
var gulpConnect = require('gulp-connect')
var gulpNotify  = require('gulp-notify')
var reactify    = require('reactify')
var source      = require('vinyl-source-stream')
var watchify    = require('watchify')

/******************************************************************************/


// Run compilation once
gulp.task('scripts', function() {
  return buildScript('app.js', false)
})

// Run 'scripts' task first, then watch for future changes
gulp.task('default', ['scripts'], function () {
  return buildScript('app.js', true)
})

function buildScript(file, watch) {

  var props = {
    entries: ['./src/js' + file],
    debug: true,
    transform: [babelify, reactify]
  }

  var bundler = watch ? watchify(browserify(props)) : browserify(props)

  function rebundle() {
    var stream = bundler.bundle()

    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./build/'))
  }

  bundler.on('update', function () {
    rebundle()
    console.log('Doing source rebundle/compilation')
  })

  // Run it once on first time script running
  return rebundle()
}

/**
 * Handle errors ocurred during compilation.
 *
 * @return {[type]} [description]
 */
function handleErrors() {
  var args = Array.prototype.slice.call(arguments)

  gulpNotify.onError({
    title: 'Compilation error',
    message: '<%=error.message %>'
  }).apply(this, args)

  this.emit('end')
}
