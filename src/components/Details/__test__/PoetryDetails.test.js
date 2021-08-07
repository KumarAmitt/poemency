import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureAppStore from '../../../store/configureStore';
import PoetryDetails from '../PoetryDetails';

const store = configureAppStore();

describe('PoetryDetails', () => {
  test('match snapshot of PoetrtDetails', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <BrowserRouter>
          <PoetryDetails match={{ params: { author: 'a' }, title: 't' }} />
        </BrowserRouter>
      </Provider>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
