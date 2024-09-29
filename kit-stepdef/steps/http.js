const { generateRandomString } = require('kit-common');
module.exports = {
    loadHttpSteps: function ({ Given, When, Then }) {
        When(/^send request "(.*)"$/, (path, table) => {
            console.log('URL: ', path)

            const request = table.rawTable.reduce((result, current) => {
                if (current[0][0] === "$") {
                    result[current[0].replace('$', '')] = JSON.parse(current[1])
                }
                return result
            }, {})
            console.log('REQUEST: ', request);


            const body = table.rawTable.reduce((result, current) => {
                if (current[0][0] !== "$") {
                    result[current[0]] = JSON.parse(current[1])
                }
                return result
            }, {})
            console.log('REQUEST BODY: ', body)
        })

        Then(/^received response$/, (table) => {
            const request = table.rawTable.reduce((result, current) => {
                if (current[0][0] === "$") {
                    result[current[0].replace('$', '')] = JSON.parse(current[1])
                }
                return result
            }, {})
            console.log('RESPONSE: ', request);


            const body = table.rawTable.reduce((result, current) => {
                if (current[0][0] !== "$") {
                    result[current[0]] = JSON.parse(current[1])
                }
                return result
            }, {})
            console.log('RESPONSE BODY: ', body)
        })
    }
}