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
    single: {},
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
    singlePoetryReceived: (state, action) => {
      state.single.title = action.payload[0].title;
      state.single.author = action.payload[0].author;
      state.single.lines = action.payload[0].lines;
      state.single.lineCount = action.payload[0].linecount;
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
  singlePoetryReceived,
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
  url: '/random/20/title,author,linecount',
  onStart: poetryRequested.type,
  onSuccess: randomPoetryReceived.type,
  onError: poetryRequestFailed.type,
});

export const loadSinglePoetry = (title, author) => apiCallBegan({
  url: `/title,author/${title};${author}`,
  onStart: poetryRequested.type,
  onSuccess: singlePoetryReceived.type,
  onError: poetryRequestFailed.type,
});

export const loadMatchPoetry = (title) => apiCallBegan({
  url: `/title/${title}`,
  onStart: poetryRequested.type,
  onSuccess: randomPoetryReceived.type,
  onError: poetryRequestFailed.type,
});

export const loadPoetryByAuthor = (author) => apiCallBegan({
  url: `/author/${author}`,
  onStart: poetryRequested.type,
  onSuccess: randomPoetryReceived.type,
  onError: poetryRequestFailed.type,
});

// SELECTOR

export const getRandomPoetries = createSelector(
  (state) => state.entities.poetry.random20,
  (random20) => random20,
);

export const getSinglePoetries = createSelector(
    (state) => state.entities.poetry.single,
    (single) => single,
);

export const getTitles = createSelector(
    (state) => state.entities.poetry.title,
    (title) => title,
);

export const getAuthors = createSelector(
    (state) => state.entities.poetry.author,
    (author) => author,
);
