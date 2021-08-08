import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureAppStore from '../../../store/configureStore';
import Home from '../Home';

const store = configureAppStore();

describe('Home', () => {
  test('should match the snapshot of Home', () => {
    const tree = renderer.create(<Provider store={store}><Home /></Provider>);

    expect(tree).toMatchSnapshot();
  });
});
