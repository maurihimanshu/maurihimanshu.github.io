import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Certifications } from './Certifications';

describe('Certifications feature', () => {
  it('renders certifications with verification links', () => {
    render(<Certifications />);

    expect(screen.getByText('AWS Certified Developer – Associate')).toBeInTheDocument();
    expect(screen.getByText('AWS Certified Cloud Practitioner')).toBeInTheDocument();
    expect(screen.getByText('Microsoft Certified: Azure Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('GitHub Copilot Certification')).toBeInTheDocument();
    expect(screen.getAllByText('Credentials').length).toBe(4);
  });

  it('renders formal education and honors recognitions', () => {
    render(<Certifications />);

    expect(screen.getByText('Bachelor of Technology (B.Tech)')).toBeInTheDocument();
    expect(screen.getByText('I.K. Gujral Punjab Technical University')).toBeInTheDocument();
    expect(
      screen.getByText('5/5 Manager Rating for 3 Consecutive Years')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Recognized as Team Subject Matter Expert (SME)')
    ).toBeInTheDocument();
  });
});
