import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureAppStore from '../../../../store/configureStore';
import FilterAuthor from '../FilterAuthor';

const store = configureAppStore();

describe('FilterAuthor', () => {
  test('should match the snapshot of FilterAuthor', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <FilterAuthor filterAuthor={() => {}} />
      </Provider>,
    );

    expect(tree).toMatchSnapshot();
  });
});
