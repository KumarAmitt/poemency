import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

/* eslint-disable */
const slice = createSlice({
  name: 'poetry',
  initialState: {
    title: [],
    author: [],
    random20: [],
    loading: false,
  },
  reducers: {
    poetryRequested: (state, action) => {
      state.loading = true;
    },
    poetryTitleReceived: (state, action) => {
      state.title = action.payload.titles;
      state.loading = false;
    },
    poetryAuthorsReceived: (state, action) => {
      state.author = action.payload.authors;
      state.loading = false;
    },
    randomPoetryReceived: (state, action) => {
      state.random20 = action.payload;
      state.loading = false;
    },
    poetryRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const {
  poetryRequested,
  poetryTitleReceived,
  poetryAuthorsReceived,
  randomPoetryReceived,
  poetryRequestFailed,
} = slice.actions;

export default slice.reducer;

// ACTION CREATORS

export const loadTitles = () => apiCallBegan({
  url: '/title',
  onStart: poetryRequested.type,
  onSuccess: poetryTitleReceived.type,
  onError: poetryRequestFailed.type,
});

export const loadAuthors = () => apiCallBegan({
  url: '/author',
  onStart: poetryRequested.type,
  onSuccess: poetryAuthorsReceived.type,
  onError: poetryRequestFailed.type,
});

export const random20 = () => apiCallBegan({
  url: '/random/20',
  onStart: poetryRequested.type,
  onSuccess: randomPoetryReceived.type,
  onError: poetryRequestFailed.type,
});

// SELECTOR

export const getRandomPoetries = createSelector(
  (state) => state.entities.poetry.random20,
  (random20) => random20,
);
