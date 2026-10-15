module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/tests/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'src/tests/**/*.spec.js': ['coverage']
    },
    reporters: ['progress', 'coverage', 'kjhtml'],
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity
  })
}
