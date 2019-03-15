import { createAction, handleActions } from 'redux-actions';
import { Platform } from 'react-native';

const SET_PLATFORM = 'SET_PLATFORM';

export const setPlatform = createAction(SET_PLATFORM); // os

const initialState = {
  os: Platform.OS,
};

export default handleActions(
  {
    [SET_PLATFORM]: (state, { payload }) => ({
      os: payload,
    }),
  },
  initialState,
);
