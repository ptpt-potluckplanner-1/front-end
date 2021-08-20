import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

test("renders Header", () => {
  // arrange
  render(<Header />);
  // act
  const header = screen.getByTestId(/header/i);
  // assert
  expect(header).toBeInTheDocument();
});
