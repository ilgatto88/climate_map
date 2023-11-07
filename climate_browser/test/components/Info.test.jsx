import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "@jest/globals";
import Info from "../../src/components/Info";
import store from "../../src/store";
import "@testing-library/jest-dom";
import { showInfo, hideInfo } from "../../src/features/infoSlice";

describe("Info Component", () => {
  it("renders the Info component when infoState is true", () => {
    store.dispatch(showInfo());
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <Info />
      </Provider>
    );

    // Assertions for the presence of specific elements
    expect(getByText("Emissions")).toBeInTheDocument();
    expect(getByText("Time Period")).toBeInTheDocument();
    expect(getByText("Climate variable")).toBeInTheDocument();
    expect(getByText("Legend")).toBeInTheDocument();
    expect(getByText("Technical description")).toBeInTheDocument();
    expect(getByAltText("Parameter formula")).toBeInTheDocument();
  });

  it("closes the About component when the close button is clicked", () => {
    const { container } = render(
      <Provider store={store}>
        <Info />
      </Provider>
    );

    // Find the close button and click it
    const closeButton = container.querySelector(".fa-xmark");
    fireEvent.click(closeButton);

    store.dispatch(hideInfo());
  });
});
