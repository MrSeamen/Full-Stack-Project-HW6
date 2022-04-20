const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  lintOnSave: false, //turn off lint,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000'
      }
    }
  }
}