import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";

import {
  lineChartAnnotationPaddingCalculator,
  insertNullValues,
} from "../src/utils/lineChartHelpers";

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

describe("Testing insertNullValues", () => {
  it("takes an array without missing elements and returns the same array", () => {
    const input = [10, 20, 30];
    const expectedOutput = [10, 20, 30];
    const timeRange = [2020, 2021, 2022];
    const startYear = 2020;
    const endYear = 2022;

    const result = insertNullValues(input, timeRange, startYear, endYear);
    expect(result).toEqual(expectedOutput);
  });

  it("takes an array with one missing element and returns the same array", () => {
    const input = [10, 20, 30];
    const expectedOutput = [null, 10, 20, 30];
    const timeRange = [2020, 2021, 2022];
    const startYear = 2019;
    const endYear = 2022;

    const result = insertNullValues(input, timeRange, startYear, endYear);
    expect(result).toEqual(expectedOutput);
  });
});
