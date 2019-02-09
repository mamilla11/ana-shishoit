"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var del = require("del");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var image = require("gulp-image");
var webp = require("gulp-webp");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");
var uglifyes = require('uglify-es');
var composer = require('gulp-uglify/composer');
var uglify = composer(uglifyes, console);

var server = require("browser-sync").create();

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/gllacy/**/*.*",
    "source/catenergy/**/*.*",
    "source/kekstagram/**/*.*",
    "source/documents/**/*.pdf"], {
    base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("gllacy", function() {
  return gulp.src([], {
    base: "source"
    })
    .pipe(gulp.dest("build"));
});



gulp.task("icons", function () {
  return gulp.src("./*.{png,ico}")
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("images", function() {
  return gulp.src("source/img/raster/**/*.{png,jpg,jpeg}", {
    base: "source"
    })
    .pipe(image())
    .pipe(gulp.dest("build"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/raster/**/*.{png,jpg,jpeg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img/webp/"));
});

gulp.task("svg", function() {
  return gulp.src("source/img/vector/**/*.svg", {
    base: "source"
    })
    .pipe(svgmin())
    .pipe(gulp.dest("build"))
});

gulp.task("sprite", function () {
  return gulp.src("build/img/vector/sprite/*.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/vector"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([include()]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
});

gulp.task("js", function () {
  return gulp.src("source/js/**/*.js", {
    base: "source"
    })
    .pipe(uglify())
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest("build"))
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/vector/**/*.svg", gulp.series("svg", "sprite", "html", "refresh"));
  gulp.watch("source/js/**/*.js", gulp.series("js", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/img/raster/**/*.{jpeg,jpg,png}", gulp.series("images", "webp", "refresh"));
});

gulp.task("build", gulp.series("clean", "copy", "icons", "css", "images", "svg", "sprite", "html", "js"));
gulp.task("start", gulp.series("build", "server"));
