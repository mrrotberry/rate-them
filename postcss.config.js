module.exports = {
  plugins: [
    process.env.NODE_ENV === 'production' ? require('autoprefixer')() : false,
    require('postcss-nested'),
  ],
};
