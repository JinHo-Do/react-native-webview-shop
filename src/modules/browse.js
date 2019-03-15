import { createAction, handleActions } from 'redux-actions';

const SET_URI = 'SET_URI';

export const setUri = createAction(SET_URI); // uri

const initialState = {
  brandUri: '',
};

export default handleActions(
  {
    [SET_URI]: (state, { payload }) => ({
      brandUri: payload,
    }),
  },
  initialState,
);
