var gulp = require('gulp'),
  path = require('path'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  header = require('gulp-header'),
  rename = require('gulp-rename'),
  cssnano = require('gulp-cssnano'),
  imagemin = require('gulp-imagemin')
;(plumber = require('gulp-plumber')),
  (fileinclude = require('gulp-file-include')),
  (prettify = require('gulp-prettify')),
  (notify = require('gulp-notify'))
package = require('./package.json')

var paths = {
  templates: 'src/templates',
  fixtures: 'src/fixtures',
  dest: 'app/',
}

var config = {
  browserSync: {
    files: [
      ,
      // 'app/*.html',
      'app/assets/img/**/*',
      'app/assets/css/**/*',
      'app/assets/js/**/*',
    ],
    server: {
      baseDir: 'app',
      index: 'index.html',
    },
    reloadOnRestart: true,
  },
  prettify: {
    indent_size: 2,
  },
}

var banner = [
  '/*!\n' +
    ' * <%= package.name %>\n' +
    ' * <%= package.title %>\n' +
    ' * <%= package.url %>\n' +
    ' * @author <%= package.author %>\n' +
    ' * @version <%= package.version %>\n' +
    ' * Copyright ' +
    new Date().getFullYear() +
    '. <%= package.license %> licensed.\n' +
    ' */',
  '\n',
].join('')

var onError = function(err) {
  notify.onError({
    title: 'Gulp - Keffe Real Estate',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>',
    sound: 'Beep',
  })(err)
  this.emit('end')
}

function styles() {
  return gulp
    .src('src/scss/style.scss')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package: package }))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({ stream: true }))
}

function scripts() {
  return gulp
    .src('src/js/scripts.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(header(banner, { package: package }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .pipe(header(banner, { package: package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({ stream: true, once: true }))
}

function assets() {
  var src = ['app/assets/img/*.(jpg|png|gif|svg)']
  return (
    gulp
      .src(src)
      //prevent pipe breaking caused by errors from gulp plugins
      .pipe(plumber({ errorHandler: onError }))
      .pipe(
        imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })
      )
      .pipe(gulp.dest('app/assets/img'))
  )
}

function access(cb) {
  return gulp.src('app/**/*.html').pipe(access())
}

function html(cb) {
  var src = [path.join(paths.templates, '**/*.html')]

  return (
    gulp
      .src(src)
      .pipe(plumber({ errorHandler: onError }))
      .pipe(fileinclude())
      // Put template files into base. // Hack
      .pipe(
        rename({
          extname: '',
        })
      )
      .pipe(
        rename({
          extname: '.html',
        })
      )
      .pipe(prettify(config.prettify))
      .pipe(gulp.dest(paths.dest))
      .pipe(browserSync.reload({ stream: true }))
  )
}

function browsersync(cb) {
  browserSync.init(null, config.browserSync)
}

function livereload(cb) {
  browserSync.reload()
}

function watchFiles() {
  gulp.watch('src/scss/*/*.scss', styles)
  gulp.watch('src/js/*.js', scripts)
  gulp.watch(['src/**/*.html'], html)
  gulp.series(livereload)
}

gulp.task('styles', gulp.series(styles))

gulp.task('build', gulp.series(html, styles, scripts))

const build = gulp.series(gulp.parallel(styles, html, assets, scripts))
const watch = gulp.parallel(build, watchFiles, browsersync)

exports.build = build
exports.watch = watch
exports.default = build
