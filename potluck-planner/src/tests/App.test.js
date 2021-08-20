import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders App", () => {
  // arrange
  render(<App />);
  // act
  const app = screen.getByTestId(/app/i);
  // assert
  expect(app).toBeInTheDocument();
});
