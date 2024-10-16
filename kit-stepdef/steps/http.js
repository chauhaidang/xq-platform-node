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
      static defaultRequestModel = {
        baseUrl: '',
        path: '',
        url: '',
        headers: {},
        queryParams: {},
        body: null,
        authorization: null,
        method: ''
      }

      static defaultResponseModel = {
        headers: {},
        body: null,
        statusCode: 0,
      }

      request = { ...HttpWorld.defaultRequestModel }
      response = { ...HttpWorld.defaultResponseModel }

      constructor(options) {
        super(options)
      }
    }

    setWorldConstructor(HttpWorld)

    const CONFIG_PROPS = {
      URL: "apiUrl"
    }

    /**
     * Map requestParameters, requestBody from http request model to the world instance
     * @param {*} world
     * @param {*} requestParameters from cucumberHelper.transformCucumberTableToHttpModel
     * @param {*} requestBody from cucumberHelper.transformCucumberTableToHttpModel
     */
    function mapRequestToWorld(world, requestParameters, requestBody) {
      world.request = HttpWorld.defaultRequestModel
      world.request = { ...world.request, ...requestParameters, body: { ...requestBody } }
      world.request.baseUrl = new URL(getConfig()[CONFIG_PROPS.URL]).toString()
      world.request.url = world.request.baseUrl + world.request.path
    }

    /**
     * Map response from supertest to the world instance
     * @param {*} world
     * @param {*} response supertest request's response
     */
    function mapResponseToWorld(world, response) {
      world.response = HttpWorld.defaultResponseModel
      world.response.statusCode = response.statusCode
      world.response.body = response.body
      world.response.headers = response.headers
    }

    When('make GET request', async (table) => {
      const { requestParameters, requestBody } = cucumberHelper.transformCucumberTableToHttpModel(table)
      mapRequestToWorld(world, requestParameters, requestBody)

      const req = request(world.request.baseUrl).get(world.request.path)
      const res = await req.send()
      mapResponseToWorld(world, res)
    })


    When('make POST request', async (table) => {
      const { requestParameters, requestBody } = cucumberHelper.transformCucumberTableToHttpModel(table)
      mapRequestToWorld(world, requestParameters, requestBody)

      const req = request(world.request.baseUrl)
        .post(world.request.path)
        .set('Accept', 'application/json')

      const res = await req.send(requestBody)
      mapResponseToWorld(world, res)
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