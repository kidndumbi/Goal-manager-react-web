import React from "react";
import { render, screen } from "@testing-library/react";
import { Loading } from "../Loading";

describe("Loading Component", () => {
  it("should render Loading... text", () => {
    render(<Loading text="Loading..." />);
    const linkElement = screen.getByText(/Loading.../i, { exact: true });
    expect(linkElement).toBeInTheDocument();
  });
});
