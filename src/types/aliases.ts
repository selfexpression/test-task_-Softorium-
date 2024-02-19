import { store } from '../slices/index';

export type RootState = ReturnType<typeof store.getState>;
