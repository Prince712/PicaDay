import {ADD_TO_LIST} from '../actions/types';

const initialState = {
  data: [{name: 'Iron Man'}],
  installDate: new Date(),
};

const addPost = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_LIST:
      return {
        ...state,
        data: state.data.concat(action.payload),
      };

    default:
      return state;
  }
};

export default addPost;
