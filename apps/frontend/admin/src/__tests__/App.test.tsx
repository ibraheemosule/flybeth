import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Admin Frontend Tests', () => {
  it('can render a basic component', () => {
    const TestComponent = () => <div>Admin Test Component</div>;
    
    render(<TestComponent />);
    
    expect(screen.getByText('Admin Test Component')).toBeInTheDocument();
  });

  it('can perform basic assertions', () => {
    expect(2 * 3).toBe(6);
    expect(['a', 'b', 'c']).toHaveLength(3);
  });

  it('can test objects', () => {
    const user = {
      id: '123',
      name: 'Test User',
      role: 'admin'
    };
    
    expect(user).toEqual({
      id: '123',
      name: 'Test User',
      role: 'admin'
    });
  });
});