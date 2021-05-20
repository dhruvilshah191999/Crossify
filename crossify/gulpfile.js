const gulp = require("gulp");
const gap = require("gulp-append-prepend");

gulp.task("licenses", async function () {
  // this is to add Creative Tim licenses in the production mode for the minified js
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!

      =========================================================
      * Crossify - v1.0.0 
      =========================================================
      
      * Why are you here ? Enjoy the worldclass virtual experience. Don't Worry About the Code :) We Got this !
      * Coded by Harshil Patel , Dhruvil Shah , Bhargav Kanodiya , Sagar Solanki 
      
      Byeee ʕ•́ᴥ•̀ʔっ 
      =========================================================
*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified html
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--
      =========================================================
      * Crossify - v1.0.0 
      =========================================================
      
      * Why are you here ? Enjoy the worldclass virtual experience. Don't Worry About the Code :) We Got this !
      * Coded by Harshil Patel , Dhruvil Shah , Bhargav Kanodiya , Sagar Solanki 
      
      Byeee ʕ•́ᴥ•̀ʔっ 
      =========================================================

-->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified css
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!

      =========================================================
      * Crossify - v1.0.0 
      =========================================================
      
      * Why are you here ? Enjoy the worldclass virtual experience. Don't Worry About the Code :) We Got this !
      * Coded by Harshil Patel , Dhruvil Shah , Bhargav Kanodiya , Sagar Solanki 
      
      Byeee ʕ•́ᴥ•̀ʔっ 
      =========================================================
      
*/`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});
