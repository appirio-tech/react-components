/**
 * Helper methods to format values
 */

/**
 * Fomats number, separating every 3 digits with comma
 *
 * @param {Number} number
 */
export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
