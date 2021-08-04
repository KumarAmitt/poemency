import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { getTitles, loadTitles } from '../slicers/title';

describe('titleSlice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const titleSlice = () => store.getState().entities.title;

  const createState = () => ({
    entities: {
      title: {
        titles: [],
      },
    },
  });

  describe('loading Titles', () => {
    describe('loading titles', () => {
      it('should return an array of all the titles', async () => {
        fakeAxios.onGet('/title').reply(200, { titles: ['t1', 't2'] });

        await store.dispatch(loadTitles());

        expect(titleSlice().titles).toHaveLength(2);
      });

      it('should not returns title if Network error found', async () => {
        fakeAxios.onGet('/title').reply(500);

        await store.dispatch(loadTitles());

        expect(titleSlice().titles).toHaveLength(0);
      });
    });

    describe('loading indicators', () => {
      it('should be true while fetching titles', () => {
        fakeAxios.onGet('/title').reply(() => {
          expect(titleSlice().loading).toBe(true);
          return [200, { titles: ['t1'] }];
        });
        store.dispatch(loadTitles());
      });

      it('should be false after the titles are fetched', async () => {
        fakeAxios.onGet('/title').reply(200, { titles: ['t1'] });

        await store.dispatch(loadTitles());

        expect(titleSlice().loading).toBe(false);
      });

      it('should be false if server returns error', async () => {
        fakeAxios.onGet('/title').reply(500);

        await store.dispatch(loadTitles());

        expect(titleSlice().loading).toBe(false);
      });
    });
  });

  describe('selectors', () => {
    it('getTitleSelector', () => {
      const state = createState();
      state.entities.title.titles = ['title 1', 'title 2'];

      const result = getTitles(state);

      expect(result).toHaveLength(2);
    });
  });
});
