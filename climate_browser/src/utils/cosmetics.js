// Forces signing on a number, returned as a string
function getNumberWithSign(theNumber) {
  if (theNumber > 0) {
    return `+${theNumber}`;
  }
  return theNumber.toString();
}

export default getNumberWithSign;
