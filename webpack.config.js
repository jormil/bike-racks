const path = require('path');

// Basic config
module.exports = {
  // Set to dev mode, prevents minification
  mode:"development",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'

        ]
        }
      }
    },
    // Style loaders for CSS, Sass
    {
      test:/\.s?css$/,
      use:['style-loader', 'css-loader', 'sass-loader']
    }
  ]
}
};
