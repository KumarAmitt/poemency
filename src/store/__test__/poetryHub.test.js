import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureAppStore from '../configureStore';
import {
  loadPoetryByAbsTitle, loadPoetryByAuthor, loadPoetryByTitle, loadPoetryHub,
} from '../slicers/poetryHub';

describe('poetryHub', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureAppStore();
  });

  const poetryHubSlice = () => store.getState().entities.poetryHub.poems;

  // const createState = () => ({
  //   entities: {
  //     poetryHub: {
  //       poems: [],
  //       absPoems: [],
  //       loading: false,
  //     },
  //   },
  // });

  describe('loading PoetryHub', () => {
    describe('loadPoetryHub', () => {
      it('should return an array of poetries', async () => {
        fakeAxios.onGet('/random/20/title,author,linecount').reply(200, [{ title: 't1', author: 'a1' }]);

        await store.dispatch(loadPoetryHub());

        expect(poetryHubSlice()).toHaveLength(1);
      });

      it('should not returns poetries if Network error found', async () => {
        fakeAxios.onGet('/random/20/title,author,linecount').reply(500);

        await store.dispatch(loadPoetryHub());

        expect(poetryHubSlice()).toHaveLength(0);
      });
    });

    describe('loadPoetryByAuthor', () => {
      const author = 'a1';
      it('should return an array of poetries from the same author', async () => {
        fakeAxios.onGet(`/author/${author}/author,title,linecount`).reply(200, [{ author: 'a1' }, { author: 'a1' }]);

        await store.dispatch(loadPoetryByAuthor(author));

        expect(poetryHubSlice()[0]).toEqual(expect.objectContaining({ author: 'a1' }));
        expect(poetryHubSlice()[1]).toEqual(expect.objectContaining({ author: 'a1' }));
      });

      it('should not returns any poetry by author if Network error found', async () => {
        fakeAxios.onGet(`/author/${author}/author,title,linecount`).reply(500);

        await store.dispatch(loadPoetryByAuthor(author));

        expect(poetryHubSlice()).toHaveLength(0);
      });
    });

    describe('loadPoetryByTitle', () => {
      const title = 't';
      it('should return an array of poetries with matching title keyword', async () => {
        fakeAxios.onGet(`/title/${title}/author,title,linecount`).reply(200, [{ title: 't1' }, { title: 't2' }]);

        await store.dispatch(loadPoetryByTitle(title));

        expect(poetryHubSlice()[0]).toEqual(expect.objectContaining({ title: 't1' }));
        expect(poetryHubSlice()[1]).toEqual(expect.objectContaining({ title: 't2' }));
      });

      it('should not returns any poetry by title if Network error found', async () => {
        fakeAxios.onGet(`/title/${title}/author,title,linecount`).reply(500);

        await store.dispatch(loadPoetryByTitle(title));

        expect(poetryHubSlice()).toHaveLength(0);
      });
    });

    describe('loadPoetryByAbsTitle', () => {
      const title = 't';
      it('should return an array of poetries with absolute title', async () => {
        fakeAxios.onGet(`/title/${title}:abs/author,title,linecount`).reply(200, [{ title: 't1', author: 'a1' }]);

        await store.dispatch(loadPoetryByAbsTitle(title));
        const absPoem = store.getState().entities.poetryHub.absPoems;

        expect(absPoem).toEqual([{ title: 't1', author: 'a1' }]);
      });

      it('should not returns any poetry by absolute title if Network error found', async () => {
        fakeAxios.onGet(`/title/${title}:abs/author,title,linecount`).reply(500);

        await store.dispatch(loadPoetryByAbsTitle(title));
        const absPoem = store.getState().entities.poetryHub.absPoems;

        expect(absPoem).toHaveLength(0);
      });
    });
  });
});
