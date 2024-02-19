import { createSlice } from '@reduxjs/toolkit';

type Technology = {
  name: string;
}

type Stack = Technology[];

interface Data {
  id: number;
  main_technologies: Stack;
  more_technologies: Stack;
  name: string;
  slug: string;
}

const initialState: { data: Data[] } = {
  data: [],
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, { payload }: { payload: Data[] }) => {
      state.data = [...state.data, ...payload];
    },
  },
});

export const { actions, reducer } = slice;
