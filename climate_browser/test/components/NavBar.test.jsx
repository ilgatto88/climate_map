import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { describe, expect, it, jest } from "@jest/globals";
import NavBar from "../../src/components/NavBar";
import { showAbout } from "../../src/features/aboutSlice";
import { showInfo } from "../../src/features/infoSlice";
import "@testing-library/jest-dom";

// Mock dependencies and Redux store
jest.mock("react-redux");

describe("NavBar component", () => {
  // Create mock implementations of useDispatch and useSelector
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  const mockState = {
    scenarioHandler: { value: "rcp26" }, // Replace with your actual state
    futurePeriodHandler: { value: "2036-2065" }, // Replace with your actual state
    parameterHandler: { value: "tm" }, // Replace with your actual state
  };
  useSelector.mockImplementation((selector) => selector(mockState));

  it("renders correctly", () => {
    const { getByText, getByRole } = render(<NavBar />);

    expect(getByText("MENU")).toBeInTheDocument();
    expect(getByText("INFO")).toBeInTheDocument();
    expect(getByRole("navigation")).toBeInTheDocument();
  });

  it("toggles the menu on click", () => {
    const { container } = render(<NavBar />);
    const menuButton = container.querySelector("#menu-title");
    fireEvent.click(menuButton);

    // Assert that the menu is open
    const menuWrapper = container.querySelector(".menu-wrapper");
    expect(menuWrapper).toHaveClass("open");

    fireEvent.click(menuButton);

    // Assert that the menu is closed
    expect(menuWrapper).not.toHaveClass("open");
  });

  it("dispatches showAbout action", () => {
    const { getByText } = render(<NavBar />);
    const aboutButton = getByText("About the Atlas");

    fireEvent.click(aboutButton);

    // Assert that the showAbout action was dispatched
    expect(dispatch).toHaveBeenCalledWith(showAbout());
  });

  it("dispatches showInfo action", () => {
    const { getByText } = render(<NavBar />);
    const infoButton = getByText("INFO");

    fireEvent.click(infoButton);

    // Assert that the showInfo action was dispatched
    expect(dispatch).toHaveBeenCalledWith(showInfo());
  });
});
