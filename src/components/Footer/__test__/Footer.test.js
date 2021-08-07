import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../Footer';

describe('Footer', () => {
  test('should match snapshot of Footer', () => {
    const tree = renderer.create(<Footer />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
