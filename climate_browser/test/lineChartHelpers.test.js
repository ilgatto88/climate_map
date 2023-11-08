import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";

import { lineChartAnnotationPaddingCalculator } from "../src/utils/lineChartHelpers";

describe("Testing lineChartAnnotationPaddingCalculator", () => {
  it("takes 5 and returns 0.5", () => {
    const input = 5;
    const output = 0.5;
    expect(lineChartAnnotationPaddingCalculator(input)).toEqual(output);
  });
  it("takes 30 and returns 1", () => {
    const input = 30;
    const output = 1;
    expect(lineChartAnnotationPaddingCalculator(input)).toEqual(output);
  });
  it("takes 70 and returns 2", () => {
    const input = 70;
    const output = 2;
    expect(lineChartAnnotationPaddingCalculator(input)).toEqual(output);
  });
  it("takes 150 and returns 3", () => {
    const input = 150;
    const output = 3;
    expect(lineChartAnnotationPaddingCalculator(input)).toEqual(output);
  });
  it("takes 250 and returns 3.5", () => {
    const input = 250;
    const output = 3.5;
    expect(lineChartAnnotationPaddingCalculator(input)).toEqual(output);
  });
});
