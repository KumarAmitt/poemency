import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import configureAppStore from '../../../../store/configureStore';
import FilterTitle from '../FilterTitle';

const store = configureAppStore();

describe('FilterTitler', () => {
  test('should match the snapshot of FilterTitle', () => {
    const tree = renderer.create(<Provider store={store}><FilterTitle /></Provider>);

    expect(tree).toMatchSnapshot();
  });
});
