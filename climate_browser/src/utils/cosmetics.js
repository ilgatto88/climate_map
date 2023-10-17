// Forces signing on a number, returned as a string
export function getNumberWithSign(theNumber) {
  if (theNumber > 0) {
    return `+${theNumber}`;
  }
  return theNumber.toString();
}

export function activateButton(divClass, id) {
  const element = document.getElementById(id);
  const timelineButtons = document.querySelectorAll(`.${divClass} button`);
  timelineButtons.forEach((button) => {
    button.classList.add("outline");
  });
  element.classList.remove("outline");
}
