module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'styled-jsx/babel',
      {
        sourceMaps: process.env.NODE_ENV === 'development',
        vendorPrefixes: process.env.NODE_ENV === 'production',
        plugins: [
          'styled-jsx-plugin-sass',
        ],
      },
    ],
    ['@babel/plugin-transform-runtime',
      {
        'regenerator': true,
      },
    ],
  ],
};
