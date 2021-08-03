import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
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
    authorRequestFailed: (state, action) => {
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
