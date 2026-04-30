const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 关闭代码检查，减少报错
  
  devServer: {
    host: '0.0.0.0', // 允许外部访问
    port: 8080,      // 本地前端启动端口
    proxy: {
      // 匹配所有以 /dbapi 开头的请求
      '/dbapi': {
        target: 'http://127.0.0.1:3333', // 转发到你的 Node.js 后端端口
        changeOrigin: true,              // 允许跨域
        pathRewrite: {
          '^/dbapi': '/dbapi'            // 关键：保留 /dbapi 前缀，与 server.js 路由一致
        }
      }
    }
  }
})