import { screen, render } from "@testing-library/react";
import LoginForm from "../components/LoginForm";

test("renders LoginForm component", () => {
  render(<LoginForm />);
  const loginForm = screen.getByTestId("loginForm");
  expect(loginForm).toBeInTheDocument();
});
