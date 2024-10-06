const cucumberHelper = require('../cucumberHelper')
const { getConfig } = require("kit-common")
const request = require('supertest')
const { expect } = require('chai')

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
        baseUrl: '',
        path: '',
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

    const CONFIG_PROPS = {
      URL: "apiUrl"
    }

    When('send GET request', async (table) => {
      const requestParameters = cucumberHelper.reduceTokenizedTableToMap(table)
      const requestBody = cucumberHelper.reduceTableToMap(table)
      world.request = { ...world.request, ...requestParameters, body: { ...requestBody } }
      world.request.baseUrl = new URL(getConfig()[CONFIG_PROPS.URL]).toString()
      world.request.url = world.request.baseUrl + world.request.path

      const response = await request(world.request.baseUrl).get(world.request.path)
      world.response.statusCode = response.statusCode
      world.response.body = response.body
      world.response.headers = response.headers
    })

    Then('received response', (table) => {
      const expectedResponseParameters = cucumberHelper.reduceTokenizedTableToMap(table)
      const expectedResponseBody = cucumberHelper.reduceTableToMap(table)
      expect(world.response.statusCode).to.equal(expectedResponseParameters.statusCode)
      for (const [key, _] of Object.entries(expectedResponseBody)) {
        expect(world.response.body[key], `Validating json property '${key}'`).to.equal(expectedResponseBody[key])
      }
    })
  }
}