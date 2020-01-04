var gulp = require("gulp");
var fileinclude = require("gulp-file-include");
var changed = require("gulp-changed");
var browserSync = require("browser-sync").create();
var del = require("del");
var babel = require("gulp-babel");
// var sass = require('gulp-sass');

gulp.task("delbuild", function() {
  return del("build");
});

// css
gulp.task("css", function() {
  return (
    gulp
      .src("./src/css/*.css")
      .pipe(changed("build", { extension: ".css" }))
      // .pipe(sass()) //增加这行
      .pipe(gulp.dest("./build/css"))
      .pipe(
        browserSync.reload({
          //内容更改则触发reload
          stream: true
        })
      )
  );
});
gulp.task("img", function() {
  return gulp.src("./src/images/*.{png,jpg,gif,jpeg,ico}").pipe(gulp.dest("./build/images")).pipe(
    browserSync.reload({
      //内容更改则触发reload
      stream: true
    })
  );
});
gulp.task("js", function() {
  return gulp
    .src("./src/js/*.js")
    .pipe(changed("build"), { extension: ".js" })
    // .pipe(
    //   babel({
    //     presets: ["@babel/preset-env"]
    //   })
    // )
    .pipe(gulp.dest("build/js"))
    .pipe(
      browserSync.reload({
        //内容更改则触发reload
        stream: true
      })
    );
});

gulp.task("html", function() {
  return gulp
    .src("./src/*.html")
    .pipe(changed("build"), { extension: ".html" })
    .pipe(
      fileinclude({
        basepath: "./src/components",
        indent: true
      })
    )
    .pipe(gulp.dest("build"))
    .pipe(
      browserSync.reload({
        //内容更改则触发reload
        stream: true
      })
    );
});

gulp.task("mp4", function() {
  return gulp.src("./src/*.mp4")
    .pipe(gulp.dest("build"))
});

gulp.task("watch", function() {
  // 建立浏览器自动刷新服务器
  browserSync.init({
    server: {
      baseDir: "build" // 设置服务器的根目录
    },
    notify: false //禁用浏览器的通知元素
  });
  gulp.watch("src/*.html", gulp.series("html"));
  gulp.watch("src/css/*.css", gulp.series("css"));
  gulp.watch("src/js/*.js", gulp.series("js"));
  gulp.watch("./src/images/*.{png,jpg,gif,jpeg,ico}", gulp.series("img"));

});

gulp.task(
  "default",
  gulp.series(gulp.parallel("delbuild", "css", "img", "js", "html","mp4", "watch"))
);
