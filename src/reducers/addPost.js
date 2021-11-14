import {ADD_TO_LIST, UPDATE_IMAGE_PATH, UPDATE_CAPTION} from '../actions/types';
import update from 'immutability-helper';
const initialState = {
  data: [],
  installDate: new Date(),
  maxTemp:0,
  minTemp:0
};

const addPost = (state = initialState, action) => {
  let index;
  switch (action.type) {
      
    case ADD_TO_LIST:

    let newData = state.data.concat(action.payload);
     let  max_temp_obj = newData.reduce(function(prev, current) {
        return (prev.temperature > current.temperature) ? prev : current
     })
     let  min_temp_obj = newData.reduce(function(prev, current) {
      return (prev.temperature < current.temperature) ? prev : current
     });

      return {
        ...state,
        data: newData,
        maxTemp : max_temp_obj,
        minTemp : min_temp_obj
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
