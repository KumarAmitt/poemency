import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureAppStore from '../../../store/configureStore';
import Loading from '../Loading';

const store = configureAppStore();

describe('Loading', () => {
  test('should match the snapshot of Loading', () => {
    const tree = renderer.create(<Provider store={store}><Loading /></Provider>);

    expect(tree).toMatchSnapshot();
  });
});
