import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('renders Header', () => {
render(<Header />);
const header  = screen.getByTestId(/header/i);
expect(header).toBeInTheDocument();
});