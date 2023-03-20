const SPECIFIER_REGEX = /^(~=|===?|!=|<=?|>=?)\s*([0-9]+(\.([0-9a-zA-Z]+|\*))*)$/;

/**
 * Validates a Python version specifier as per PEP 440
 *
 * @see https://peps.python.org/pep-0440/#version-specifiers
 * @param {string} specifier A potential Python version specifier
 * @returns {boolean} Whether or not it meets PEP 440 spec
 */
function validate(specifier) {
  // Specifiers can be separated and combined via commas, so lets split the string and test every specifier
  const allSpecifiers = specifier.split(",").map(segment => segment.trim());
  return Boolean(allSpecifiers.every(spec => spec.match(SPECIFIER_REGEX)));
}

module.exports = {
  validate,
};
