import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import {
  getAuthors, getRandomAuthors, isAuthorLoading, loadAuthors,
} from '../slicers/author';

describe('authorSlice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const authorSlice = () => store.getState().entities.author;

  const createState = () => ({
    entities: {
      author: {
        authors: [],
        loading: false,
      },
    },
  });

  describe('loadingAuthors', () => {
    describe('loadAuthors', () => {
      it('should return an array of all the authors', async () => {
        fakeAxios.onGet('/author').reply(200, { authors: ['a1', 'a2'] });

        await store.dispatch(loadAuthors());

        expect(authorSlice().authors).toHaveLength(2);
      });

      it('should not returns authors if Network error found', async () => {
        fakeAxios.onGet('/author').reply(500);

        await store.dispatch(loadAuthors());

        expect(authorSlice().authors).toHaveLength(0);
      });
    });

    describe('loading indicators', () => {
      it('should be true while fetching authors', () => {
        fakeAxios.onGet('/author').reply(() => {
          expect(authorSlice().loading).toBe(true);
          return [200, { authors: ['a1'] }];
        });
        store.dispatch(loadAuthors());
      });

      it('should be false after the authors are fetched', async () => {
        fakeAxios.onGet('/author').reply(200, { authors: ['a1'] });

        await store.dispatch(loadAuthors());

        expect(authorSlice().loading).toBe(false);
      });

      it('should be false if server returns error', async () => {
        fakeAxios.onGet('/author').reply(500);

        await store.dispatch(loadAuthors());

        expect(authorSlice().loading).toBe(false);
      });
    });
  });

  describe('selectors', () => {
    it('getAuthors selector should return all authors', () => {
      const state = createState();
      state.entities.author.authors = ['author 1', 'author 2'];

      const result = getAuthors(state);

      expect(result).toHaveLength(2);
    });

    it('getRandomAuthors selector should return an array of 5 randomly picked authors', () => {
      const state = createState();
      state.entities.author.authors = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'];

      const result = getRandomAuthors(state);

      expect(result).toHaveLength(5);
    });

    it('getRandomAuthors selector should picked authors from the list of authors', () => {
      const state = createState();
      state.entities.author.authors = ['a1', 'a2', 'a3'];

      const result = getRandomAuthors(state);

      expect(result).toContain('a2');
    });

    it('isAuthorLoading selector return true if loading state is true', () => {
      const state = createState();
      state.entities.author.loading = true;

      const result = isAuthorLoading(state);

      expect(result).toBeTruthy();
    });
  });
});
