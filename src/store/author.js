import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

/* eslint-disable */
const authorSlice = createSlice({
  name: 'author',
  initialState: {
    authors: [],
    loading: false,
  },
  reducers: {
    authorRequested: (state, action) => {
      state.loading = true;
    },
    authorReceived: (state, action) => {
      state.authors = action.payload.authors;
      state.loading = false;
    },
    authorRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const {authorRequested, authorReceived, authorRequestFailed } = authorSlice.actions;
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