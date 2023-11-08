import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {
  describe,
  expect,
  it,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { useSelector, useDispatch } from "react-redux";
import About from "../../src/components/About";
import { hideAbout } from "../../src/features/aboutSlice";
import "@testing-library/jest-dom";

// Mock the useSelector and useDispatch functions
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("About Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Mock useSelector to return true to show the About component
    useSelector.mockImplementation((selector) =>
      selector({ aboutHandler: { value: true } })
    );
    // Mock useDispatch to use the mockDispatch function
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    mockDispatch.mockClear();
  });

  it("renders the About component when aboutState is true", () => {
    const { queryByText } = render(<About />);

    // Use queryByText to find text anywhere within the rendered component
    const rightsText = queryByText("© 2023 All rights reserved");

    // Assert that the text is found
    expect(rightsText).toBeTruthy();
  });

  it("closes the About component when the close button is clicked", () => {
    const { container } = render(<About />);

    // Find the close button and click it
    const closeButton = container.querySelector(".fa-xmark");
    fireEvent.click(closeButton);

    // Assert that the dispatch function is called with hideAbout action
    expect(mockDispatch).toHaveBeenCalledWith(hideAbout());
  });

  it("returns null when aboutState is false", () => {
    // Mock useSelector to return false to hide the About component
    useSelector.mockImplementation((selector) =>
      selector({ aboutHandler: { value: false } })
    );

    const { container } = render(<About />);

    // Ensure that the container is empty (i.e., no elements rendered)
    expect(container.firstChild).toBeNull();
  });
});
