import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import pickRandom from 'pick-random';
import { apiCallBegan } from '../api';

/* eslint-disable */
const authorSlice = createSlice({
  name: 'author',
  initialState: {
    authors: [],
    loading: false,
  },
  reducers: {
    authorRequested: (author, action) => {
      author.loading = true;
    },
    authorReceived: (author, action) => {
      author.authors = action.payload.authors;
      author.loading = false;
    },
    authorRequestFailed: (author, action) => {
      author.loading = false;
    },
  },
});
/* eslint-enable */

const { authorRequested, authorReceived, authorRequestFailed } = authorSlice.actions;
export default authorSlice.reducer;

// ACTION CREATOR

export const loadAuthors = () => apiCallBegan({
  url: '/author',
  onStart: authorRequested.type,
  onSuccess: authorReceived.type,
  onError: authorRequestFailed.type,
});

// SELECTOR

export const getAuthors = createSelector(
  (state) => state.entities.author.authors,
  (authors) => authors,
);

export const getRandomAuthors = createSelector(
  (state) => state.entities.author.authors,
  (authors) => (authors.length > 5 ? pickRandom(authors, { count: 5 }) : authors),
);

export const isAuthorLoading = createSelector(
  (state) => state.entities.author.loading,
  (loading) => loading,
);
