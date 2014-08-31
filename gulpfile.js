'use strict';
// generated on 2014-06-06 using generator-ee-foundation 0.1.0

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');
var browserify = require('gulp-browserify');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('assets/scss/application.scss')
        .pipe($.sass({
                errLogToConsole: false,
                onError: function(err) {
                    return $.notify().write(err);
                }
        }))
        .pipe($.autoprefixer(['last 2 versions', 'Explorer 9']))
        .pipe(gulp.dest('assets/css'))
        .pipe(reload({stream:true}))
        .pipe($.size())
        .pipe($.notify("Sass compilation complete."));
});

gulp.task('scripts', function () {
    return gulp.src('assets/js/app.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe(browserify())
        .pipe(reload({stream:true}))
        .pipe($.size())
        .pipe(gulp.dest('./assets/js/dist'))
        .pipe($.notify("JS compilation complete."));
});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('*.html')
        .pipe($.useref.assets({searchPath: './'}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('assets/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/assets/images'))
        .pipe(reload({stream:true, once:true}))
        .pipe($.size());
});

gulp.task('fonts', function () {
    var streamqueue = require('streamqueue');
    return streamqueue({objectMode: true},
        $.bowerFiles(),
        gulp.src('assets/fonts/**/*')
    )
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('clean', function () {
    return gulp.src(['assets/css/app.css', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('serve', ['styles', 'scripts'], function () {
    browserSync.init(null, {
        proxy: "dev.sts.local",
        xip: true
    });
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;
    gulp.src('partials/footer.php')
        .pipe(wiredep({
            directory: 'bower_components',
            devDependencies: true
        })).pipe(gulp.dest('partials'));
});

gulp.task('watch', ['serve'], function () {
 
    // watch for changes
    gulp.watch(['**/*.php'], reload);
    gulp.watch('assets/scss/**/*.scss', ['styles']);
    gulp.watch('assets/js/**/*.js', ['scripts']);
    gulp.watch('assets/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});

