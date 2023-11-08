import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";

import {
  swapCoordinates,
  parseGeoServerResponse,
} from "../src/utils/geoserver/helpers";

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

describe("Testing swapCoordinates", () => {
  it("takes html code in text form and returns a value", () => {
    const input = "";
    const output = null;
    expect(parseGeoServerResponse(input)).toEqual(output);
  });

  it("takes html code in text form and returns null if text contains nothing", () => {
    const input =
      "<html><body><table class='featureInfo'><caption class='featureInfo'>STATISTIK_AUSTRIA_GEM_20230101</caption><tbody><tr><th>fid</th><th>g_id</th><th>g_name</th></tr><tr><td>STATISTIK_AUSTRIA_GEM_20230101.1550</td><td>61258</td><td>Landl</td></tr></tbody></table></body></html>";
    const output = "61258";
    expect(parseGeoServerResponse(input)).toEqual(output);
  });
});
