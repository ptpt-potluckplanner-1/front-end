import { render, screen } from "@testing-library/react";
import EventForm from "../components/EventForm";

test("renders EventForm", () => {
  // arrange
  render(<EventForm />);
  // act
  const eventForm = screen.getByTestId(/eventForm/i);
  // assert
  expect(eventForm).toBeInTheDocument();
});
