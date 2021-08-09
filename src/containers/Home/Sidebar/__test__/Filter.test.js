import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureAppStore from '../../../../store/configureStore';
import Filter from '../Filter';

const store = configureAppStore();

describe('Filter', () => {
  test('should match the snapshot of Filter', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Filter filterAuthor={() => {}} />
      </Provider>,
    );

    expect(tree).toMatchSnapshot();
  });
});
