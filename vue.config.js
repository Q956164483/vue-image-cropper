module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? `./` : '/',
  assetsDir: 'static',
  devServer: {
    port: 8089, // 端口号
    // https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
  },
  chainWebpack: config => {
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    // imageRule.uses.clear()
    config.module
      .rule('images')
      .use('url-loader')
      .options({
        limit: 10000,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'static/img/[name].[hash:8].[ext]'
          }
        }
      })
  }
}