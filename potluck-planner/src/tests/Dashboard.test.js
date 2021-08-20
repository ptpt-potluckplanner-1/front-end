import { screen, render } from "@testing-library/react";
import Dashboard from "../components/Dashboard";

test("renders Dashboard component", () => {
  render(<Dashboard />);
  const dashboard = screen.getByTestId(/dashboard/i);
  expect(dashboard).toBeInTheDocument();
});
