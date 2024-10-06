module.exports = {
  default: {
    parallel: 1,
    format: [
      'html:cucumber-report.html',
      'progress-bar',
      '@cucumber/pretty-formatter'
    ],
    paths: ['features/**/*.feature'],
    import: ['step-definitions/**/*.js']
  }
}