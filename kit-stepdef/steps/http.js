const cucumberHelper = require('../cucumberHelper');

module.exports = {
  /**
   * Load re-written http cucumber steps
   * @param {Function} Given: Cucumber method
   * @param {Function} When: Cucumber method
   * @param {Function} Then: Cucumber method
   * @param {Function} setWorldConstructor: Cucumber setWorldConstructor
   * @param {object} world: Cucumber the world object
   }}
   */
  loadHttpSteps: function ({ Given, When, Then, setWorldConstructor, world }) {
    const { World } = require('@cucumber/cucumber')
    class HttpWorld extends World {
      request = {
        url: '',
        headers: {},
        queryParams: {},
        body: null,
        authorization: null,
        method: ''
      }

      response = {
        headers: {},
        body: null,
        statusCode: 0,
      }

      constructor(options) {
        super(options)
      }
    }

    setWorldConstructor(HttpWorld)

    When('send request {string}', (path, table) => {
      world.request.url = path
      const request = cucumberHelper.reduceTokenizedTableToMap(table)
      const body = cucumberHelper.reduceTableToMap(table)
      world.request = { ...world.request, ...request, body: { ...body } }
    })

    Then('received response', (table) => {
      const response = cucumberHelper.reduceTokenizedTableToMap(table)
      const body = cucumberHelper.reduceTableToMap(table)
      world.response = { ...world.response, ...response, body: { ...body } }
    })
  }
}