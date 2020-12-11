const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const StyleLintPlugin = require("stylelint-webpack-plugin");
module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  outputDir: "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: "assets", // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 关闭eslint
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {},
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@scss", resolve("src/assets/css"))
      .set("@components", resolve("src/components"))
      .set("@views", resolve("src/views"))
      .set("@router", resolve("src/router"))
      .set("@store", resolve("src/store"));
    // 压缩图片
    if (IS_PROD) {
      config.module
        .rule("images")
        .use("image-webpack-loader")
        .loader("image-webpack-loader")
        .options({
          mozjpeg: { progressive: true, quality: 65 },
          optipng: { enabled: false },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false }
          // webp: { quality: 75 }
        });
    }
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        // 正则匹配想要lint监测的文件
        files: ["src/**/*.vue", "src/assets/css/*.scss"],
        fix: true
      })
    ]
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            // 配置使用 autoprefixer
            overrideBrowserslist: ["last 15 versions"]
          }),
          require("postcss-px-to-viewport")({
            unitToConvert: "px",
            viewportWidth: 750, // (Number) The width of the viewport.
            propList: ["*"],
            unitPrecision: 6, // (Number) The decimal numbers to allow the REM units to grow to.
            viewportUnit: "vw", // (String) Expected units.
            fontViewportUnit: "vw",
            selectorBlackList: [".ignore", ".hairlines"], // (Array) The selectors to ignore and leave as px.
            minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
            mediaQuery: true // (Boolean) Allow px to be converted in media queries.
            // exclude: /(\/|\\)(node_modules)(\/|\\)/
          }),
          require("postcss-viewport-units")({
            filterRule: rule =>
              rule.selector.indexOf("::after") === -1 &&
              rule.selector.indexOf("::before") === -1 &&
              rule.selector.indexOf(":after") === -1 &&
              rule.selector.indexOf("img") === -1 &&
              rule.selector.indexOf(":before") === -1
          }),
          require("cssnano")({
            preset: "advanced",
            autoprefixer: false,
            "postcss-zindex": false
          })
        ]
      }
    }
  }
};
