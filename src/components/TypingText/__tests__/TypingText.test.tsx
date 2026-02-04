import { render, screen } from '@testing-library/react';
import TypingText from '../index';

describe('TypingText', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render with text prop', () => {
    render(<TypingText text="Hello World" />);
    
    // Initially should be empty or starting
    const element = screen.getByText(/Hello World|^$/);
    expect(element).toBeInTheDocument();
  });

  it('should accept speed prop', () => {
    const { container } = render(<TypingText text="Test" speed={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('should render as span by default', () => {
    const { container } = render(<TypingText text="Test" />);
    const span = container.querySelector('span');
    expect(span).toBeInTheDocument();
  });
});
