import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";

import { getNumberWithSign, activateButton } from "../src/utils/cosmetics";

describe("Testing getNumberWithSign", () => {
  it("takes 5 as input and returns +5 as string", () => {
    const input = 5;
    const output = "+5";
    expect(getNumberWithSign(input)).toEqual(output);
  });
  it("Takes -1 as input and returns -1 as string", () => {
    const input = -1;
    const output = "-1";
    expect(getNumberWithSign(input)).toEqual(output);
  });

  it("Takes 0 as input and returns 0 as string", () => {
    const input = 0;
    const output = "0";
    expect(getNumberWithSign(input)).toEqual(output);
  });
});

describe("Testing activateButton", () => {
  it("should activate the button when the container exists", () => {
    document.body.innerHTML = `
      <div class="button-container">
        <button id="button1" class="outline">Button 1</button>
        <button id="button2" class="outline">Button 2</button>
        <button id="button3" class="outline">Button 3</button>
      </div>
    `;

    activateButton("button-container", "button2");

    expect(
      document.getElementById("button2").classList.contains("outline")
    ).toBe(false);
  });
});
