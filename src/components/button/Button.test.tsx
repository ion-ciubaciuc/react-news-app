import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button"; // Assuming your component is in the same directory

describe("Button component", () => {
  // Test case for rendering the button with default props
  test("renders button with default styles", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText("Click me");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-white bg-blue-700");
  });

  // Test case for rendering the button with secondary color
  test("renders button with secondary color styles", () => {
    render(<Button color="secondary">Click me</Button>);
    const button = screen.getByText("Click me");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "bg-white border border-gray-300 hover:bg-gray-100"
    );
  });

  // Test case for rendering the button as a link
  test("renders button as a link", () => {
    render(<Button href="/path">Click me</Button>);
    const link = screen.getByText("Click me");

    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
  });

  // Test case for handling button click
  test("calls onClick prop when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Click me</Button>);
    const button = screen.getByText("Click me");

    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });

  // Test case for handling loading state
  test("disables button and shows loading text when isLoading is true", () => {
    render(<Button isLoading>Click me</Button>);
    const button = screen.getByText("Loading...");

    expect(button).toBeDisabled();
  });
});
