import {ADD_TO_LIST, UPDATE_IMAGE_PATH, UPDATE_CAPTION} from '../actions/types';
import update from 'immutability-helper';
const initialState = {
  data: [],
  installDate: new Date(),
  maxTemp: 0,
  minTemp: 0,
};

const addPost = (state = initialState, action) => {
  let index;
  switch (action.type) {
    case ADD_TO_LIST:
      let newData;
      let newPostDate = action.payload.post_date;
      let lastPostDate = state.data.length > 0 ? state.data[0].post_date :'';

      if (lastPostDate == newPostDate) {
        newData = update(state.data, {$splice: [[0, 1]]});
        newData = update(newData, {$unshift: [action.payload]});
      } else {
        newData = update(state.data, {$unshift: [action.payload]});
      }

      let max_temp_obj = newData.reduce(function (prev, current) {
        return prev.temperature > current.temperature ? prev : current;
      });
      let min_temp_obj = newData.reduce(function (prev, current) {
        return prev.temperature < current.temperature ? prev : current;
      });

      return update(state, {
        data: {$set: newData},
        maxTemp: {$set: max_temp_obj},
        minTemp: {$set: min_temp_obj},
      });

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
