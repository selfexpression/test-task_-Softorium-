import { createSlice } from '@reduxjs/toolkit';

type NamedEntity = {
  name: string;
}

interface VacancyList {
  id: number;
  main_technologies: NamedEntity[];
  more_technologies: NamedEntity[];
  name: string;
  slug: string;
}

interface currentVacancyInfo extends VacancyList {
  min_requirements: NamedEntity[];
  tasks: NamedEntity[];
  list_offer: NamedEntity[];
  salary: string;
  is_active: boolean;
}

const initialState: {
  vacancyList: VacancyList[], currentVacancyInfo: currentVacancyInfo | null
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
    setCurrentVacancyInfo: (state, { payload }: { payload: currentVacancyInfo }) => {
      state.currentVacancyInfo = payload;
    },
  },
});

export const { actions, reducer } = slice;
