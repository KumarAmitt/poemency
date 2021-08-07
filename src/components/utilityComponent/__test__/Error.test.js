import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureAppStore from '../../../store/configureStore';
import Error from '../Error';

const store = configureAppStore();

describe('Error', () => {
  test('should match the snapshot of Error', () => {
    const tree = renderer.create(<Provider store={store}><Error /></Provider>);

    expect(tree).toMatchSnapshot();
  });
});
