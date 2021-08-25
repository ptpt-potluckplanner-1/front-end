import { render, screen } from "@testing-library/react";
import InviteeForm from "../components/InviteeForm";

test("renders InviteeForm", () => {
  // arrange
  render(<InviteeForm />);
  // act
  const inviteeForm = screen.getByTestId(/inviteeForm/i);
  // assert
  expect(inviteeForm).toBeInTheDocument();
});
