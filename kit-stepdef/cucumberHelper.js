module.exports = {
  /**
   * Reduce tokenized value in cucumber table (2D array) to an object with key-value entries
   * @param {{rawTable: object}} cucumberTable
   * @returns {object}
   */
  reduceTokenizedTableToMap(cucumberTable) {
    return cucumberTable.rawTable.reduce((result, current) => {
      if (current[0][0] === "$") {
        result[current[0].replace('$', '')] = JSON.parse(current[1])
      }
      return result
    }, {})
  },
  /**
   * Reduce cucumber table (2D array) to an object with key-value entries
   * @param {{rawTable: object}} cucumberTable
   * @returns {object}
   */
  reduceTableToMap(cucumberTable) {
    return cucumberTable.rawTable.reduce((result, current) => {
      if (current[0][0] !== "$") {
        result[current[0]] = JSON.parse(current[1])
      }
      return result
    }, {})
  }
}