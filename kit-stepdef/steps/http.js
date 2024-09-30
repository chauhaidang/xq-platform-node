const cucumberHelper = require('../cucumberHelper');

module.exports = {
  loadHttpSteps: function ({ Given, When, Then }) {
    When(/^send request "(.*)"$/, (path, table) => {
      console.log('URL: ', path)
      const request = cucumberHelper.reduceTokenizedTableToMap(table)
      const body = cucumberHelper.reduceTableToMap(table)
    })

    Then(/^received response$/, (table) => {
      const request = cucumberHelper.reduceTokenizedTableToMap(table)
      const body = cucumberHelper.reduceTableToMap(table)
    })
  }
}