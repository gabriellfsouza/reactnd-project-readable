import {RECEIVE_POSTS,
        POST_VOTE,
        ADD_POST,
        REMOVE_POST,
        UPDATE_POST} from '../actions/posts';

import {objToArray} from '../utils/helpers'


export default function posts (state={},action){
    switch (action.type) {
        case RECEIVE_POSTS:
            
            return {
                ...state,
                ...action.posts
            }
        case POST_VOTE :

            let objPost = objToArray(state).find(post=>post.id===action.id);
            let indice = objToArray(state).indexOf(objPost);
             
            return {...state, [indice]: {...state[indice],voteScore:(action.upVote === true) ? objPost.voteScore+1 : objPost.voteScore-1}};
        
        case ADD_POST:
            
            const nextID = objToArray(state).length;

            return {...state,[nextID]:action.post};
        
        case UPDATE_POST:
        {
            const arrState = objToArray(state).filter(post=>post.id !== action.post.id);
            const {post} = action;
            return {...arrState,post};
        }
            
        case REMOVE_POST:
        {
            const arrState = objToArray(state).filter(post=>post.id !== action.id);
            return {...arrState};
        }
        default:
            return state;
    }
    
}