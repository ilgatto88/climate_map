import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";

import { swapCoordinates } from "../src/utils/geoserver/helpers";

describe("Testing swapCoordinates", () => {
  it("takes [[5, 6], [7, 8]] as array and returns [[6, 5], [8, 7]]", () => {
    const input = [
      [5, 6],
      [7, 8],
    ];
    const output = [
      [6, 5],
      [8, 7],
    ];
    expect(swapCoordinates(input)).toEqual(output);
  });
});
