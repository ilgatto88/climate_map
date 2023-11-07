import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, beforeEach } from "@jest/globals";
import configureStore from "redux-mock-store";
import MapFooter from "../../src/components/MapFooter";
import { changeCategory } from "../../src/features/categorySlice";
import "@testing-library/jest-dom";

const mockStore = configureStore();

describe("MapFooter Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      categoryHandler: { value: "temperature" },
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

  it("dispatches changeCategory when a category is clicked", () => {
    const { container } = render(
      <Provider store={store}>
        <MapFooter />
      </Provider>
    );

    // Click on a category item
    const categoryItem = container.getElementsByClassName(
      "category-temperature"
    )[0];
    fireEvent.click(categoryItem);

    // Assert that the changeCategory action is dispatched with the correct category name
    const actions = store.getActions();
    expect(actions[0]).toEqual(changeCategory("temperature"));
  });
});
