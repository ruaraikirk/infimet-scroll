import React from 'react';
import { describe, expect, test, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

const testObject = {
  primaryImageSmall: 'https://images.metmuseum.org/CRDImages/an/web-large/1999,325,009.jpg',
  title: 'Cylinder seal and modern impression: bird, inscription',
  department: 'Ancient Near Eastern Art',
  objectURL: 'https://www.metmuseum.org/art/collection/search/327605'
};

describe('Car test', () => {
  test('Object data should be presented on page', () => {
    render(<Card artObject={testObject} />);

    expect(screen.getByText('Cylinder seal and modern impression: bird, inscription')).toBeDefined();
    expect(screen.getByText('Ancient Near Eastern Art')).toBeDefined();
  });

  it('Image element alt and src contains correct value', () => {
    render(<Card artObject={testObject} />);
    const testImage = document.querySelector('img');
    expect(testImage.alt).toContain('Cylinder seal and modern impression: bird, inscription');
    expect(testImage.src).toContain('https://images.metmuseum.org/CRDImages/an/web-large/1999,325,009.jpg');
  });
});
