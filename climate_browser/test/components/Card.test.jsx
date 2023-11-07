import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import Card from "../../src/components/Card";
import "@testing-library/jest-dom";

describe("Card component", () => {
  it("renders with provided props", () => {
    const { getByText } = render(
      <Card
        title="Test Title"
        subtitle="Test Subtitle"
        description="<p>Test Description</p>"
      />
    );

    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Subtitle")).toBeInTheDocument();
    expect(getByText("Test Description")).toBeInTheDocument();
  });

  it("sanitizes and renders HTML in description", () => {
    const { getByText } = render(
      <Card
        title="Test Title"
        subtitle="Test Subtitle"
        description='<a href="https://example.com" target="_blank">Test Description</a>'
      />
    );

    expect(getByText("Test Description")).toBeInTheDocument();
    expect(getByText("Test Description")).toHaveAttribute(
      "href",
      "https://example.com"
    );
    expect(getByText("Test Description")).toHaveAttribute("target", "_blank");
  });
});
