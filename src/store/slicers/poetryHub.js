import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const poetryHubSlice = createSlice({
  name: 'poetryHub',
  initialState: {
    poems: [],
    loading: false,
  },
  reducers: {
    poemsRequested: (poetryHub, action) => {
      poetryHub.loading = true;
    },
    poemsReceived: (poetryHub, action) => {
      poetryHub.poems = action.payload;
      poetryHub.loading = false;
    },
    poemsRequestFailed: (poetryHub, action) => {
      poetryHub .loading = false;
    },
  },
});
/* eslint-enable */

const { poemsRequested, poemsReceived, poemsRequestFailed } = poetryHubSlice.actions;
export default poetryHubSlice.reducer;

// ACTION CREATOR

export const loadPoetryHub = () => apiCallBegan({
  url: '/random/20/title,author,linecount',
  onStart: poemsRequested.type,
  onSuccess: poemsReceived.type,
  onError: poemsRequestFailed.type,
});

export const loadPoetryByAuthor = (author) => apiCallBegan({
  url: `/author/${author}/author,title,linecount`,
  onStart: poemsRequested.type,
  onSuccess: poemsReceived.type,
  onError: poemsRequestFailed.type,
});

export const loadPoetryByTitle = (title) => apiCallBegan({
  url: `/title/${title}/author,title,linecount`,
  onStart: poemsRequested.type,
  onSuccess: poemsReceived.type,
  onError: poemsRequestFailed.type,
});

// SELECTOR

export const getPoetryHub = createSelector(
  (state) => state.entities.poetryHub.poems,
  (poems) => poems,
);

export const isPoetryHubLoading = createSelector(
  (state) => state.entities.poetryHub.loading,
  (loading) => loading,
);

export const getIsSameAuthor = (author) => createSelector(
  (state) => state.entities.poetryHub.poems,
  (poems) => poems.every((e) => e.author === author),
);
