const mix = require("laravel-mix");
const rimraf = require("rimraf");
require("laravel-mix-bundle-analyzer");

const publicPath = mix.inProduction() ? "prod" : "dev";

const vendors = [
  "jquery",
  "axios",
  "bootstrap",
  "@popperjs",
  "yii2-pjax",
];

mix.setPublicPath("web/" + publicPath);

mix.options({
  resourceRoot: "../",
  fileLoaderDirs: {
    fonts: "fonts",
    images: "images"
  },
  autoprefixer: {
    enabled: true
  }
});

// Typescript
mix.ts(["assets/src/ts/frontend.ts"], "js").extract(vendors);

mix.sass("assets/src/scss/vendor.scss", "css");
mix.sass("assets/src/scss/theme.tww.scss", "css");

if (!mix.inProduction()) {
  mix
    .bundleAnalyzer()
    .sourceMaps()
    .webpackConfig({ devtool: "source-map" })
    .browserSync({
      proxy: "https://degetal.clockwork.lcl",
      https: true,
      files: [
        "web/dev/css/**/*.css",
        "web/dev/js/**/*.js",
        "views/**/*",
        "widgets/**/*"
      ],
      notify: false
    });
}
