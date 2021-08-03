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
    poemRequested: (state, action) => {
      state.loading = true;
    },
    poemReceived: (state, action) => {
      state.poem.title = action.payload[0].title;
      state.poem.author = action.payload[0].author;
      state.poem.lines = action.payload[0].lines;
      state.poem.lineCount = action.payload[0].linecount;
      state.loading = false;
    },
    poemRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

const {poemRequested, poemReceived, poemRequestFailed} = uniqPoetrySlice.actions;
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