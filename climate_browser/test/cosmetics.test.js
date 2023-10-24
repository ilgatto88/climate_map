import { describe, expect, it } from "@jest/globals";

import { getNumberWithSign } from "../src/utils/cosmetics";

describe("Converting numeric value to string", () => {
  it("Takes 5 as input and returns +5 as string", () => {
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
