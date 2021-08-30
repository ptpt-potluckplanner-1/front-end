import { render, screen } from "@testing-library/react";
import Events from "../components/Events";
import { DUMMY_EVENTS } from "../constants/constants";

test("renders Events", () => {
  // arrange
  render(<Events eventslist={DUMMY_EVENTS} />);
  // act
  const events = screen.getByTestId(/events/i);
  // assert
  expect(events).toBeInTheDocument();
});
