import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, beforeEach } from "@jest/globals";
import configureStore from "redux-mock-store";
import MapFooter from "../../src/components/MapFooter";
import "@testing-library/jest-dom";

const mockStore = configureStore();

describe("MapFooter Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      categoryHandler: { value: "temperature" },
      scenarioBarHandler: { value: false },
    });
  });

  it("renders the MapFooter component", () => {
    const { container } = render(
      <Provider store={store}>
        <MapFooter />
      </Provider>
    );

    // Assert that the component is rendered
    const mapFooterElement = container.getElementsByClassName("map-footer");
    expect(mapFooterElement.length).toBe(1);
  });

  it("renders MapFooterItems based on categories", () => {
    const { container } = render(
      <Provider store={store}>
        <MapFooter />
      </Provider>
    );

    // Assert that MapFooterItems are rendered for each category
    const categories = ["temperature", "hotweather", "coldweather"];
    categories.forEach((categoryName) => {
      const categoryItem = container.getElementsByClassName(
        `category-${categoryName}`
      );
      expect(categoryItem.length).toBe(1);
    });
  });
});
