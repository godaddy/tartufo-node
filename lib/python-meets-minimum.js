/**
 * Use Python version array to ensure it meets minimum version requirements
 *
 * @param {[number, number]} pythonVersion Python version number as an array
 * @returns {boolean} Returns true if the requested Python meets the minimum version
 */
function pythonMeetsMinimum([major, minor]) {
  return major === 3 && minor >= 6;
}

pythonMeetsMinimum.MINIMUM_READABLE = "3.6+";

module.exports = pythonMeetsMinimum;
