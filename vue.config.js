module.exports = {
	publicPath: process.env.VUE_APP_BASE_URL,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/style/main.sass"'
      }
    }
  },
  productionSourceMap: false
}