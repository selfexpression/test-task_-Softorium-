import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { actions as dataActions } from '../slices/dataSlice';
import type { RootState } from '../types/aliases';

interface LoadDataPayload {
  apiRoute: string;
  dataType: 'vacancyList' | 'currentVacancyInfo';
}

export const loadData = createAsyncThunk(
  'data/loadData',
  async ({ apiRoute, dataType }: LoadDataPayload, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { vacancyList, currentVacancyInfo } = state.data;

    switch (dataType) {
      case 'vacancyList':
        if (vacancyList.length) return;
        break;
      case 'currentVacancyInfo':
        if (currentVacancyInfo) return;
        break;
      default:
        break;
    }

    try {
      const response = await axios.get(apiRoute);

      switch (dataType) {
        case 'vacancyList':
          dispatch(dataActions.setVacancyList(response.data));
          break;
        case 'currentVacancyInfo':
          dispatch(dataActions.setCurrentVacancyInfo(response.data));
          break;
        default:
          throw new Error('Invalid data type');
      }
    } catch (error) {
      console.error(`Error loading ${dataType}:`, error);
      throw error;
    }
  },
);
