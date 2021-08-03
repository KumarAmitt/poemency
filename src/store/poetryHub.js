import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

/* eslint-disable */
const poetryHubSlice = createSlice({
  name: 'poetryHub',
  initialState: {
    poems: [],
    loading: false,
  },
  reducers: {
    poemsRequested: (state, action) => {
      state.loading = true;
    },
    poemsReceived: (state, action) => {
      state.poems = action.payload;
      state.loading = false;
    },
    poemsRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const {poemsRequested, poemsReceived, poemsRequestFailed} = poetryHubSlice.actions;
export default poetryHubSlice.reducer;


// ACTION CREATOR

export const loadPoetryHub = () => apiCallBegan({
  url: '/random/20/title,author,linecount',
  onStart: poemsRequested.type,
  onSuccess: poemsReceived.type,
  onError: poemsRequestFailed.type,
});

export const loadPoetryByAuthor = (author) => apiCallBegan({
  url: `/author/${author}`,
  onStart: poemsRequested.type,
  onSuccess: poemsReceived.type,
  onError: poemsRequestFailed.type,
});

export const loadPoetryByTitle = (title) => apiCallBegan({
  url: `/title/${title}`,
  onStart: poemsRequested.type,
  onSuccess: poemsReceived.type,
  onError: poemsRequestFailed.type,
});


// SELECTOR

export const getPoetryHub = createSelector(
    (state) => state.entities.poetryHub.poems,
    (poems) => poems,
);

export const getIsSameAuthor = (author) => createSelector(
    (state) => state.entities.poetryHub.poems,
    (poems) => poems.every(e => e.author === author),
)