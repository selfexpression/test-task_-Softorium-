import { configureStore } from '@reduxjs/toolkit';

import { actions as dataActions, reducer as dataSlice } from './dataSlice';

export const actions = {
  ...dataActions,
};

export const store = configureStore({
  reducer: {
    data: dataSlice,
  },
});
