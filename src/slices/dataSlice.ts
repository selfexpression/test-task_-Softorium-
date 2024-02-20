import { createSlice } from '@reduxjs/toolkit';

import { VacancyList, CurrentVacancyInfo } from '../types/interfaces';

const initialState: {
  vacancyList: VacancyList[], currentVacancyInfo: CurrentVacancyInfo | null
} = {
  vacancyList: [],
  currentVacancyInfo: null,
};

const slice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setVacancyList: (state, { payload }: { payload: VacancyList[] }) => {
      state.vacancyList = [...state.vacancyList, ...payload];
    },
    setCurrentVacancyInfo: (state, { payload }: { payload: CurrentVacancyInfo }) => {
      state.currentVacancyInfo = payload;
    },
  },
});

export const { actions, reducer } = slice;
