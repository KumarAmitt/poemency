import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import configureAppStore from '../../../store/configureStore';
import Header from '../Header';

const store = configureAppStore();

describe('Header', () => {
  test('should match snapshot of Header', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
