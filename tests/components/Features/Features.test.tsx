import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import LocaleProvider from '@/localization/LocaleProvider';
import Features from '@/components/Features/Features';
import { mockFeaturesData } from './mockFeaturesData';

describe('Features Component', () => {
  test('renders main features section with title and subtitle', () => {
    render(
      <LocaleProvider>
        <Features />
      </LocaleProvider>
    );

    expect(screen.getByText('Main Features')).toBeInTheDocument();

    expect(
      screen.getByText(
        'Now, you can dive into the rich capabilities that set our application apart. The following features embody the essence of our commitment to delivering an exceptional user experience.'
      )
    ).toBeInTheDocument();
  });

  test('renders each feature item correctly', () => {
    render(
      <LocaleProvider>
        <Features />
      </LocaleProvider>
    );
    mockFeaturesData.forEach((data) => {
      expect(screen.getByText(data.title)).toBeInTheDocument();
      expect(screen.getByText(data.description)).toBeInTheDocument();
    });
  });

  test('renders each feature image with correct alt text', () => {
    render(
      <LocaleProvider>
        <Features />
      </LocaleProvider>
    );

    mockFeaturesData.forEach((feature) => {
      const encodedImageSrc = encodeURIComponent(feature.imageSrc);
      const regex = new RegExp(encodedImageSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
      const featureImage = screen.getByAltText(feature.alt);

      expect(featureImage).toBeInTheDocument();
      expect(featureImage).toHaveAttribute('src', expect.stringMatching(regex));
    });
  });
});
