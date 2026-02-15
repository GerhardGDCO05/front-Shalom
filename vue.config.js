const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/front-Shalom/'
    : '/',
  transpileDependencies: true,
  productionSourceMap: false
})