import { describe, expect, it } from "@jest/globals";
import "@testing-library/jest-dom";

import {
  lineChartAnnotationPaddingCalculator,
  insertNullValues,
  range,
  prepareLineDiagramData,
  fetchData,
} from "../src/utils/lineChartHelpers";

import { historicalData, ensembleData, outData } from "./testdata";

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

  it("takes an array with one missing element and returns the array with added null", () => {
    const input = [10, 20, 30];
    const expectedOutput = [null, 10, 20, 30];
    const timeRange = [2020, 2021, 2022];
    const startYear = 2019;
    const endYear = 2022;

    const result = insertNullValues(input, timeRange, startYear, endYear);
    expect(result).toEqual(expectedOutput);
  });

  it("takes an array with multiple elements missing at the end and returns the extended array", () => {
    const input = [10, 20, 30];
    const expectedOutput = [10, 20, 30, null, null, null];
    const timeRange = [2020, 2021, 2022];
    const startYear = 2020;
    const endYear = 2025;

    const result = insertNullValues(input, timeRange, startYear, endYear);
    expect(result).toEqual(expectedOutput);
  });
});

describe("Testing custom range function", () => {
  it("start and end year and returns array filled with all years in between", () => {
    const startYear = 2000;
    const endYear = 2005;
    const expectedOutput = [2000, 2001, 2002, 2003, 2004, 2005];
    const output = range(startYear, endYear);
    expect(output).toEqual(expectedOutput);
  });
});

describe("Testing prepareLineDiagramData", () => {
  it("start and end year and returns array filled with all years in between", () => {
    const inputHistorical = historicalData;
    const inputEnsemble = ensembleData;
    const hideHistoricalData = true;
    const startYear = 1961;
    const endYear = 1962;
    const expectedOutput = outData;

    const output = prepareLineDiagramData(
      inputHistorical,
      inputEnsemble,
      hideHistoricalData,
      startYear,
      endYear
    );
    console.log(output);
    expect(output).toEqual(expectedOutput);
  });
});

describe("fetchData function", () => {
  it("should handle errors when fetching data", async () => {
    const API_ENDPOINT = "https://example.com/nonexistent-api";
    const data = await fetchData(API_ENDPOINT);
    expect(data).toBeNull();
  });
});
