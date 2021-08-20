import { render, screen } from '@testing-library/react';
import EventForm from '../components/EventForm';

test('renders EventForm', () => {
render(<EventForm />);
const eventForm  = screen.getByTestId(/eventForm/i);
expect(eventForm).toBeInTheDocument();
});