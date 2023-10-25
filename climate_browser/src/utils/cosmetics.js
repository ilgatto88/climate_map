/**
 * Given a number, return a string with a "+" or "-" prefix, or simply 0 if number is zero.
 * @param {numeric} number
 * @returns {string}
 */

export function getNumberWithSign(number) {
  if (number > 0) {
    return `+${number}`;
  }
  return number.toString();
}

/**
 * Activate a specific button in a container by removing the "outline" class from it
 * and adding the "outline" class to all other buttons in the container.
 *
 * @param {string} containerSelector
 * @param {string} buttonId
 * @returns
 */

export function activateButton(containerSelector, buttonId) {
  const container = document.querySelectorAll(`.${containerSelector} button`);
  const buttons = document.getElementById(buttonId);

  container.forEach((button) => {
    button.classList.add("outline");
  });
  buttons.classList.remove("outline");
}
