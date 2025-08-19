const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081, // porta do front-end
    proxy: {
      '/usuario': {
        target: 'http://localhost:8080', // ou 8080, se o back estiver nessa porta
        changeOrigin: true
      }
    }
  }
})