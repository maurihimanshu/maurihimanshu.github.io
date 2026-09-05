import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GithubIcon, LinkedinIcon } from './Icons';

describe('Icons component', () => {
  it('renders GithubIcon with default and custom classNames', () => {
    const { container, rerender } = render(<GithubIcon />);
    expect(container.querySelector('svg')).toHaveClass('w-4 h-4');

    rerender(<GithubIcon className="custom-icon" />);
    expect(container.querySelector('svg')).toHaveClass('custom-icon');
  });

  it('renders LinkedinIcon with default and custom classNames', () => {
    const { container, rerender } = render(<LinkedinIcon />);
    expect(container.querySelector('svg')).toHaveClass('w-4 h-4');

    rerender(<LinkedinIcon className="custom-icon-2" />);
    expect(container.querySelector('svg')).toHaveClass('custom-icon-2');
  });
});
