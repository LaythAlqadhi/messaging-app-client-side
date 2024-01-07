import React from 'react';
import { render, screen } from '@testing-library/react';
import InitialPage from '../InitialPage';

describe('InitialPage component', () => {
  it('renders InitialPage component correctly', () => {
    render(<InitialPage />);

    expect(screen.container).toMatchSnapshot();
  });
});
