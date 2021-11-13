import {ADD_TO_LIST,UPDATE_IMAGE_PATH,UPDATE_CAPTION} from './types';

export const addToList = (data) => async (dispatch) => {
    dispatch({
      type: ADD_TO_LIST,
      payload: data,
    })
};

export const updateImagePath = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_IMAGE_PATH,
    payload: data,
  })
};

export const updateCaption = (data) => async (dispatch) => {
  dispatch({
    type: UPDATE_CAPTION,
    payload: data,
  })
};
