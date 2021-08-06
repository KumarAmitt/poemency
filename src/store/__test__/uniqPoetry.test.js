import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { loadUniqPoetry } from '../slicers/uniqPoetry';

describe('uniqPoetrySlice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const uniqPoetrySlice = () => store.getState().entities.uniqPoetry;

  // const createState = () => ({
  //   entities: {
  //     uniqPoetry: {
  //       poem: {},
  //       loading: false,
  //     },
  //   },
  // });

  describe('loading unique poetry', () => {
    describe('loadUniqPoetry', () => {
      const title = 't1';
      const author = 'a1';
      it('should return the details of single poetry as an object', async () => {
        fakeAxios.onGet(`/author,title/${author};${title}`).reply(200, [{ title: 't1', author: 'a1', lines: ['l1', 'l2'] }]);

        await store.dispatch(loadUniqPoetry(author, title));

        expect(uniqPoetrySlice().poem.lines).toHaveLength(2);
      });

      it('should not returns poetry details if Network error found', async () => {
        fakeAxios.onGet(`/author,title/${author};${title}`).reply(500);

        await store.dispatch(loadUniqPoetry(author, title));

        expect(uniqPoetrySlice().poem).toMatchObject({});
      });
    });
  });
});
