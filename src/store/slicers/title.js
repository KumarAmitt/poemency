import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from '../api';

/* eslint-disable */
const titleSlice = createSlice({
  name: 'title',
  initialState: {
    titles: [],
    loading: false,
  },
  reducers: {
    titleRequested: (title, action) => {
      title.loading = true;
    },
    titleReceived: (title, action) => {
      title.titles = action.payload.titles;
      title.loading = false;
    },
    titleRequestFailed: (title, action) => {
      title.loading = false;
    },
  },
});
/* eslint-enable */

const { titleRequested, titleReceived, titleRequestFailed } = titleSlice.actions;
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

export const isTitleLoading = createSelector(
  (state) => state.entities.title.loading,
  (loading) => loading,
);
