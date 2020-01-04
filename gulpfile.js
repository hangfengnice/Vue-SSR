var gulp = require("gulp");
var fileinclude = require("gulp-file-include");
var changed = require("gulp-changed");
var browserSync = require("browser-sync").create();
var del = require("del");
var babel = require("gulp-babel");
// var sass = require('gulp-sass');

gulp.task("deldist", function() {
  return del("dist");
});

// css
gulp.task("css", function() {
  return (
    gulp
      .src("./src/css/*.css")
      .pipe(changed("dist", { extension: ".css" }))
      // .pipe(sass()) //增加这行
      .pipe(gulp.dest("./dist/css"))
      .pipe(
        browserSync.reload({
          //内容更改则触发reload
          stream: true
        })
      )
  );
});
gulp.task("img", function() {
  return gulp.src("./src/images").pipe(gulp.dest("./dist/images"));
});
gulp.task("js", function() {
  return gulp
    .src("./src/js/*.js")
    .pipe(changed("dist"), { extension: ".js" })
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(gulp.dest("dist/js"))
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
    .pipe(changed("dist"), { extension: ".html" })
    .pipe(
      fileinclude({
        basepath: "./src/common",
        indent: true
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(
      browserSync.reload({
        //内容更改则触发reload
        stream: true
      })
    );
});

gulp.task("watch", function() {
  // 建立浏览器自动刷新服务器
  browserSync.init({
    server: {
      baseDir: "dist" // 设置服务器的根目录
    },
    notify: false //禁用浏览器的通知元素
  });

  gulp.watch("src/*.html", gulp.series("html"));
  gulp.watch("src/css/*.css", gulp.series("css"));
  gulp.watch("src/js/*.js", gulp.series("js"));
});

gulp.task(
  "default",
  gulp.series(gulp.parallel("deldist", "css", "img", "js", "html", "watch"))
);
