/**
 * Return test props for component
 * @param {string} value
 * @returns {{{string} testID, {string} accessibilityLabel}}
 */
export function testProps(value) {
   return {
       testID: value,
       id: value
   }
}