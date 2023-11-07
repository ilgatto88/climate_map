import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import ChangeValue from "../../src/components/ChangeValue";
import "@testing-library/jest-dom";

describe("ChangeValue component", () => {
  it("renders with provided value and unit", () => {
    render(<ChangeValue value="42" unit="km/h" />);

    // Assert that the value and unit are rendered
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("km/h")).toBeInTheDocument();
  });

  it("displays the correct value and unit", () => {
    render(<ChangeValue value="100" unit="°C" />);

    // Assert that the value and unit match the provided props
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("°C")).toBeInTheDocument();
  });
});
