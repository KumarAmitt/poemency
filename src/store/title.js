import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

/* eslint-disable */
const titleSlice = createSlice({
  name: 'title',
  initialState: {
    titles: [],
    loading: false,
  },
  reducers: {
    titleRequested: (state, action) => {
      state.loading = true;
    },
    titleReceived: (state, action) => {
      state.titles = action.payload.titles;
      state.loading = false;
    },
    titleRequestFailed: (state, action) => {
      state.loading = false;
    },
  },
});

export const {titleRequested, titleReceived, titleRequestFailed} = titleSlice.actions;
export default titleSlice.reducer;


// ACTION CREATOR

export const loadTitles = () => apiCallBegan({
  url: '/title',
  onStart: titleRequested.type,
  onSuccess: titleReceived.type,
  onError: titleRequestFailed.type,
});

// SELECTOR

export const getTitles = createSelector(
    (state) => state.entities.title.titles,
    (titles) => titles,
);