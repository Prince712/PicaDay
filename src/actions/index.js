import {ADD_TO_LIST} from './types';

export const addToList = data => ({
  type: ADD_TO_LIST,
  payload: data,
});
