import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { useSelector, useDispatch, Provider } from "react-redux";
import MapFooterItem from "../../src/components/MapFooterItem";
import { changeCategory } from "../../src/features/categorySlice";
import { changeParameter } from "../../src/features/variables/parameterSlice";
import store from "../../src/store";
import "@testing-library/jest-dom";

import categories from "../../src/data/categories.json";

// Mock the useSelector and useDispatch functions
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

// Define test data
const categoryName = "hotweather";
const selectedCategory = "hotweather";
const selectedParameter = "Hot Days";

// Mock the dispatch function
const mockDispatch = jest.fn();

describe("MapFooterItem Component", () => {
  // Reset the mock functions before each test
  beforeEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    useDispatch.mockReturnValue(mockDispatch);
  });

  it("should render the component", () => {
    useSelector.mockReturnValue(selectedCategory);

    const { getAllByText } = render(
      <MapFooterItem categoryName={categoryName} />
    );

    // Assert that the component is rendered
    expect(getAllByText(categories[categoryName].name).length).toBeGreaterThan(
      0
    );
  });

  it("should expand when the category is selected", () => {
    useSelector.mockReturnValue(selectedCategory);

    const { getByRole } = render(<MapFooterItem categoryName={categoryName} />);

    const expandedUlElement = getByRole("list", {
      class: `category-${categoryName}`,
    });

    // Assert that the category is expanded
    expect(expandedUlElement).toHaveClass("expanded");
  });

  it("should call changeCategory when the category is clicked", () => {
    useSelector.mockReturnValue(selectedCategory);

    const { getAllByRole } = render(
      <MapFooterItem categoryName={categoryName} />
    );

    const divsWithRoleButton = getAllByRole("button");
    const categoryButton = divsWithRoleButton.find(
      (div) =>
        div.classList.contains("parameter-footer-item-icon") &&
        div.getAttribute("role") === "button"
    );
    fireEvent.click(categoryButton);

    // Assert that changeCategory is called with the correct category
    expect(mockDispatch).toHaveBeenCalledWith(changeCategory(categoryName));
  });
});
