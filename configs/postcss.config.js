module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-preset-env')({
      browserslist: [
        'last 2 version',
        'IE >= 10',
      ],
    }),
  ],
}
