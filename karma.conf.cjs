// Es .cjs porque package.json tiene "type": "module".
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    files: [
      'src/tests/**/*.spec.js',
      'src/tests/**/*.spec.jsx',
    ],
    exclude: [],
    preprocessors: {
      // Las pruebas de componentes necesitan webpack + babel para entender JSX e imports.
      'src/tests/**/*.spec.jsx': ['webpack'],
      'src/tests/**/*.spec.js': ['coverage'],
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '100' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
              },
            },
          },
        ],
      },
    },
    reporters: ['progress', 'coverage', 'kjhtml'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      // Para entornos sin interfaz (CI / contenedores)
      ChromeHeadlessSinSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },
    singleRun: false,
    concurrency: Infinity,
  })
}
