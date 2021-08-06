import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import { loadAuthors } from '../slicers/author';

describe('authorSlice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const authorSlice = () => store.getState().entities.author;

  // const createState = () => ({
  //   entities: {
  //     author: {
  //       authors: [],
  //     },
  //   },
  // });

  describe('loadingAuthors', () => {
    describe('loadAuthors', () => {
      it('should return an array of all the authors', async () => {
        fakeAxios.onGet('/author').reply(200, { authors: ['a1', 'a2'] });

        await store.dispatch(loadAuthors());

        expect(authorSlice().authors).toHaveLength(2);
      });
    });
  });

  it('should not returns authors if Network error found', async () => {
    fakeAxios.onGet('/author').reply(500);

    await store.dispatch(loadAuthors());

    expect(authorSlice().authors).toHaveLength(0);
  });
});
