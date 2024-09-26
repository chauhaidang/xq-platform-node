const { generateRandomString } = require('kit-common');
module.exports = {
    loadSteps: function ({ Given, When }) {
        Given('I have this', () => {
            console.log(generateRandomString(5))
        })

        When('I do this', () => {
            console.log(generateRandomString(5))
        })
    }
}