export async function fetchGeoServerResponse(url) {
  return fetch(url)
    .then((response) => response.text())
    .then((data) => data);
}

export function parseGeoServerResponse(response) {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(response, "text/html");
  const bodyIsEmpty = htmlDoc.body.innerHTML.trim() === "";
  if (!bodyIsEmpty) {
    const valueElement = htmlDoc.querySelector(".featureInfo td:nth-child(2)");
    return valueElement.textContent;
  }
  return null;
}
