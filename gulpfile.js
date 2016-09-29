var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require("gulp-ng-annotate");
var uglify = require('gulp-uglify');
var connect = require('connect');
var serveStatic = require('serve-static');
var readline = require('readline');
var open = require('open');
var express = require('express');
var helmet = require('helmet');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var exec = require('child_process').exec;

// INSTANCES
var paths = {
    sass: ['scss/**/*.scss']
};

var app = express();

// DEV TREATHS
gulp.task('sass', function (done) {
    gulp.src('scss/app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('dist/css'))
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(rename({extname: 'style.min.css'}))
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

gulp.task('js', function () {
    gulp.src([
        'js/application.js',
        'js/config/*.js',
        'js/model/*.js',
        'js/controllers/*.js',
        'js/services/*.js',
        'js/directives/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('lib', function () {
    gulp.src([
        'lib/jquery/dist/jquery.js',
        'lib/angular/angular.js',
        'lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'lib/angular-route/angular-route.js',
        'lib/jStorage/jstorage.js',
    ])
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(['js/**/*.js'], ['js']);
    gulp.watch(['lib/**/*.js'], ['lib']);
    connect().use(serveStatic(__dirname)).listen(1234);
});

gulp.task('openWindow', function () {
    open('http://localhost:' + 1234);
});

// FOR PRODUCTION THREADS
gulp.task('jsproduction', function () {
    gulp.src([
        'js/application.js',
        'js/config/*.js',
        'js/model/*.js',
        'js/controllers/*.js',
        'js/services/*.js',
        'js/directives/*.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('service', function () {

    app.set('port', 6969);
    app.set('json spaces', 4);
    app.use(helmet());
    app.use(cors());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride());
    app.use(function (req, res, next) {
        delete req.body.id;
        next();
    });

    app.listen(6969, function () {
        var config = process.env;
        console.info('Service running, port:6969');
    });

});

// TASKS
gulp.task('default', ['sass', 'js', 'lib', 'watch']);
gulp.task('open', ['sass', 'js', 'lib', 'watch', 'openWindow']);
gulp.task('run', ['sass', 'lib', 'jsproduction', 'service']);
