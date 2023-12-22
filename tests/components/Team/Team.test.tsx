import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Team from '@/components/Team/Team';
import LocaleProvider from '@/localization/LocaleProvider';
import { mockTeamData } from './mockTeamData';

describe('Team Component', () => {
  test('renders without errors', () => {
    render(
      <LocaleProvider>
        <Team />
      </LocaleProvider>
    );
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
  });

  test('renders each team member', () => {
    render(
      <LocaleProvider>
        <Team />
      </LocaleProvider>
    );
    mockTeamData.forEach((member) => {
      expect(screen.getByText(member.name)).toBeInTheDocument();
      expect(screen.getByAltText(member.name)).toBeInTheDocument();
    });
  });
});
