import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import Legend from "../../src/components/Legend";
import "@testing-library/jest-dom";

const parameter = "tm";

describe("Legend Component", () => {
  it("renders the Legend component with parameter data", () => {
    const { getByText } = render(<Legend parameter={parameter} />);

    // Assert that the legend component renders with the parameter data
    const legendTitle = getByText("Celsius Degrees");
    const legendMin = getByText("-10");
    const legendMax = getByText("20");

    expect(legendTitle).toBeInTheDocument();
    expect(legendMin).toBeInTheDocument();
    expect(legendMax).toBeInTheDocument();
  });
});
