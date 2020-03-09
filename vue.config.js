module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://39.107.234.110:8000',
          ws: true,
          changeOrigin: true
        },
       
      }
    }
  }