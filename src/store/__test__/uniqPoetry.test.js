import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { getUniqPoetry, istUniqPoetryLoading, loadUniqPoetry } from '../slicers/uniqPoetry';

describe('uniqPoetrySlice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const uniqPoetrySlice = () => store.getState().entities.uniqPoetry;

  const createState = () => ({
    entities: {
      uniqPoetry: {
        poem: {},
        loading: false,
      },
    },
  });

  describe('loading unique poetry', () => {
    const title = 't1';
    const author = 'a1';
    const url = `/author,title/${author};${title}`;
    describe('loadUniqPoetry', () => {
      it('should return the details of single poetry as an object', async () => {
        fakeAxios.onGet(url).reply(200, [{ title: 't1', author: 'a1', lines: ['l1', 'l2'] }]);

        await store.dispatch(loadUniqPoetry(author, title));

        expect(uniqPoetrySlice().poem.lines).toHaveLength(2);
      });

      it('should not returns poetry details if Network error found', async () => {
        fakeAxios.onGet(url).reply(500);

        await store.dispatch(loadUniqPoetry(author, title));

        expect(uniqPoetrySlice().poem).toMatchObject({});
      });
    });

    describe('loading indicators', () => {
      it('should be true while fetching poetry details', () => {
        fakeAxios.onGet(url).reply(() => {
          expect(uniqPoetrySlice().loading).toBe(true);
          return [200, [{ title: 't1' }]];
        });
        store.dispatch(loadUniqPoetry(author, title));
      });

      it('should be false after the poetry is fetched', async () => {
        fakeAxios.onGet(url).reply(200, [{ title: 't1' }]);

        await store.dispatch(loadUniqPoetry(author, title));

        expect(uniqPoetrySlice().loading).toBe(false);
      });

      it('should be false if server returns error', async () => {
        fakeAxios.onGet(url).reply(500);

        await store.dispatch(loadUniqPoetry(author, title));

        expect(uniqPoetrySlice().loading).toBe(false);
      });
    });
  });

  describe('selectors', () => {
    it('getUniqPoetry Selector should return poetry details as an object', () => {
      const state = createState();
      state.entities.uniqPoetry.poem = { title: 't1', author: 'a1', lines: ['l1', 'l2'] };

      const result = getUniqPoetry(state);

      expect(result).toMatchObject({ title: 't1', author: 'a1', lines: ['l1', 'l2'] });
    });

    it('isUniqPoetryLoading selector return true if the poetry is loading', () => {
      const state = createState();
      state.entities.uniqPoetry.loading = true;

      const result = istUniqPoetryLoading(state);

      expect(result).toBeTruthy();
    });

    it('isUniqPoetryLoading selector return false if the poetry is loaded', () => {
      const state = createState();
      state.entities.uniqPoetry.loading = false;

      const result = istUniqPoetryLoading(state);

      expect(result).toBeFalsy();
    });
  });
});
