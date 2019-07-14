const path = require('path')

module.exports = {
  contentBase: path.resolve(__dirname, 'dist'),
  compress: true,
  port: 9000,
  inline: true,
  hot: true,
  historyApiFallback: true,
  open: false,
}
