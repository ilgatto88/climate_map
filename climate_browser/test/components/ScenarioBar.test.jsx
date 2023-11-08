import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "@jest/globals";
import configureStore from "redux-mock-store";
import ScenarioBar from "../../src/components/ScenarioBar";
import "@testing-library/jest-dom";

import SCENARIOS_JSON from "../../src/data/scenarios.json";
import TIMEPERIOD_JSON from "../../src/data/timeperiod.json";

const SCENARIOS = Object.keys(SCENARIOS_JSON).map((key) => SCENARIOS_JSON[key]);
const TIMEPERIODS = Object.keys(TIMEPERIOD_JSON).map(
  (key) => TIMEPERIOD_JSON[key]
);

const mockStore = configureStore();
const store = mockStore({}); // Replace with your Redux store configuration

describe("ScenarioBar component", () => {
  it("renders correctly", () => {
    const { getByText, getAllByRole } = render(
      <Provider store={store}>
        <ScenarioBar />
      </Provider>
    );

    // Replace with your own assertions to match elements in the component
    expect(getByText("Climate Change")).toBeInTheDocument();
    expect(getByText("Time Period")).toBeInTheDocument();
    expect(getAllByRole("button")).toHaveLength(
      SCENARIOS.length + TIMEPERIODS.length
    );
  });

  it("handles scenario button click", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ScenarioBar />
      </Provider>
    );

    // Replace with the specific button you want to test
    const scenarioButton = getByText("Less"); // Example scenario button text
    fireEvent.click(scenarioButton);

    // Write assertions to check if the click handler works as expected
    // For example, you can expect that the Redux store state has changed
  });

  it("handles future period button click", () => {
    const { getByText } = render(
      <Provider store={store}>
        <ScenarioBar />
      </Provider>
    );

    // Replace with the specific button you want to test
    const futurePeriodButton = getByText("1991-2020"); // Example future period button text
    fireEvent.click(futurePeriodButton);

    // Write assertions to check if the click handler works as expected
    // For example, you can expect that the Redux store state has changed
  });
});
