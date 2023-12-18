import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Team from '@/components/Team/Team';
import { teamData } from '@/components/Team/teamData';

describe('Team Component', () => {
  test('renders without errors', () => {
    render(<Team />);
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
  });

  test('renders each team member', () => {
    render(<Team />);
    teamData.forEach((member) => {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByAltText(member.name)).toBeInTheDocument();
    });
  });
});
