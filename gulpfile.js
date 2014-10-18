var path = require('path');
var glob = require('glob');
var gulp = require('gulp');
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var underscorify = require('node-underscorify');
var source = require('vinyl-source-stream');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');

gulp.task('lint', function() {
  return gulp.src(['dev/js/**/*.js', '!dev/js/vendor/**/*'])
    .pipe(jshint({
      node: true,
      browser: true,
      undef: true,
      unused: 'vars',
      curly: true,
      freeze: true,
      latedef: true,
      noarg: true,
      nonew: true,
      trailing: true,
      newcap: true,
      nonbsp: true,
      maxdepth: 5,
      maxcomplexity: 19,
      predef: ["alert", "confirm", "prompt"]
    }))
    .pipe(jshint.reporter('default'));
});

function scripts() {
  return browserify({entries: ['./dev/js/index.js'], basedir: '.'})
    .transform(underscorify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('build'));
};

gulp.task('scripts-dev', scripts);
gulp.task('scripts', ['clean'], scripts);

function styles() {
  return gulp.src('dev/css/*.+(less|css)')
    .pipe(concat('index.css'))
    .pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build'));
};

gulp.task('styles', ['clean'], styles);
gulp.task('styles-dev', styles);

function statics() {
  return gulp.src('static/**/*')
    .pipe(gulp.dest('build'));
}

gulp.task('static', ['clean'], statics);

function staticFileChanged(evnt) {
  var dest = path.dirname('build/' + path.relative('static', evnt.path));
  gutil.log('copying ' + evnt.path + ' to ' + dest);
  return gulp.src(evnt.path)
    .pipe(gulp.dest(dest));
}

gulp.task('serve', function(done) {
  var app = connect();

  app.use(function(req, res, next) {
    if (!req.url.match(/\.(css|js|html|png|jpg|jpeg|gif|svg|woff|eoff|ttf)$/)) {
      req.url = '/index.html';
    }
    next();
  });

  app.use(serveStatic('build'));

  var port = gutil.env.port || 8000;
  var server = http.createServer(app);
  server.listen(port);

  server.on('listening', function() {
    gutil.log('listening for http on port ' + port);
    done();
  });

  server.on('error', function(err) {
    done(err);
  });
});

function watch() {
  gulp.watch('dev/js/**/*.+(js|json)', ['scripts-dev']);
  gulp.watch(['!dev/templates/index.tpl', 'dev/templates/**/*.tpl'], ['scripts-dev']);
  gulp.watch('dev/templates/index.tpl', ['index-dev']);
  gulp.watch('static/**/*', staticFileChanged);
  gutil.log('watching files for changes...');
}

gulp.task('watch', watch);

gulp.task('clean', function() {
  return gulp.src(['build/**/*'], {read: false})
    .pipe(clean());
});

gulp.task('build-dev', ['clean', 'lint',  'scripts', 'styles', 'static']);

gulp.task('dev', ['build-dev', 'serve', 'watch']);

gulp.task('default', ['dev']);
