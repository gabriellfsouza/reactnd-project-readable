import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading';

import posts from './posts';
import categories from './categories';
import comments from './comments';

export default combineReducers({
    posts,
    categories,
    comments,
    loadingBar:loadingBarReducer,
})