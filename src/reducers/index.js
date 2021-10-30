import {combineReducers} from 'redux';

import addPost from './addPost';

const rootReducer = combineReducers({
  posts: addPost,
});

export default rootReducer;
