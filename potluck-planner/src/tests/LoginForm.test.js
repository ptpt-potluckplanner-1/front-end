import { render, screen } from "@testing-library/react";
import LoginForm from "../components/LoginForm";

test("renders LoginForm", () => {
  // arrange
  render(<LoginForm />);
  // act
  const loginForm = screen.getByTestId(/loginForm/i);
  // assert
  expect(loginForm).toBeInTheDocument();
});
