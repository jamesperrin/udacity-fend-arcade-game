/**
 * Generates a random number between a min and max range
 * @param {number} min Minimum number
 * @param {number} max Maxium number
 * @see 
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 * https://kadimi.com/negative-random/
 */
function randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}