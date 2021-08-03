import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const uniqPoetrySlice = createSlice({
  name: 'uniqPoetry',
  initialState: {
    poem: {},
    loading: false,
  },
  reducers: {
    poemRequested: (uniqPoetry, action) => {
      uniqPoetry.loading = true;
    },
    poemReceived: (uniqPoetry, action) => {
      uniqPoetry.poem.title = action.payload[0].title;
      uniqPoetry.poem.author = action.payload[0].author;
      uniqPoetry.poem.lines = action.payload[0].lines;
      uniqPoetry.poem.lineCount = action.payload[0].linecount;
      uniqPoetry.loading = false;
    },
    poemRequestFailed: (uniqPoetry, action) => {
      uniqPoetry.loading = false;
    },
  },
});
/* eslint-enable */

const { poemRequested, poemReceived, poemRequestFailed } = uniqPoetrySlice.actions;
export default uniqPoetrySlice.reducer;

// ACTION CREATOR

export const loadUniqPoetry = (author, title) => apiCallBegan({
  url: `/author,title/${author};${title}`,
  onStart: poemRequested.type,
  onSuccess: poemReceived.type,
  onError: poemRequestFailed.type,
});

// SELECTOR

export const getUniqPoetry = createSelector(
  (state) => state.entities.uniqPoetry.poem,
  (poem) => poem,
);

export const istUniqPoetryLoading = createSelector(
  (state) => state.entities.uniqPoetry.loading,
  (loading) => loading,
);
