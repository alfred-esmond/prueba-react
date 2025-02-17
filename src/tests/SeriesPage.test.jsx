import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SeriesPage from "../pages/SeriesPage";

test("renders Popular Series heading", () => {
  render(<SeriesPage />);
  const heading = screen.getByText(/Popular Series/i);
  expect(heading).toBeInTheDocument();
});
