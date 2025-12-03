import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('B2C Frontend Tests', () => {
  it('can render a basic component', () => {
    const TestComponent = () => <div>B2C Test Component</div>;
    
    render(<TestComponent />);
    
    expect(screen.getByText('B2C Test Component')).toBeInTheDocument();
  });

  it('can test user interactions', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    
    const ButtonComponent = () => (
      <button onClick={handleClick}>Click me</button>
    );
    
    render(<ButtonComponent />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can test data structures', () => {
    const trip = {
      id: '456',
      title: 'Family Vacation',
      type: 'leisure',
      destination: 'Hawaii',
      price: 2500,
      currency: 'USD'
    };
    
    expect(trip).toEqual({
      id: expect.any(String),
      title: 'Family Vacation',
      type: 'leisure',
      destination: 'Hawaii',
      price: 2500,
      currency: 'USD'
    });
  });
});