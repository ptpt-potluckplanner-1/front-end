import { render, screen } from "@testing-library/react";
import Dashboard from "../components/Dashboard";

test("renders Dashboard", () => {
  // arrange
  render(<Dashboard />);
  // act
  const dashboard = screen.getByTestId(/dashboard/i);
  // assert
  expect(dashboard).toBeInTheDocument();
});
