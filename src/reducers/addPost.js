import {ADD_TO_LIST, UPDATE_IMAGE_PATH, UPDATE_CAPTION} from '../actions/types';
import update from 'immutability-helper';
const initialState = {
  data: [],
  installDate: new Date(),
};

const addPost = (state = initialState, action) => {
  let index;
  switch (action.type) {
    case ADD_TO_LIST:
      return {
        ...state,
        data: state.data.concat(action.payload),
      };
    case UPDATE_IMAGE_PATH:
      index = state.data.findIndex(
        item => item.post_id === action.payload.post_id,
      );
      return update(state, {
        data: {
          [index]: {
            image_path: {$set: action.payload.image_path},
          },
        },
      });
    case UPDATE_CAPTION:
      index = state.data.findIndex(
        item => item.post_id === action.payload.post_id,
      );
      return update(state, {
        data: {
          [index]: {
            caption: {$set: action.payload.caption},
          },
        },
      });

    default:
      return state;
  }
};

export default addPost;
