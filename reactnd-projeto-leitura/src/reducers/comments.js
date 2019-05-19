import {
    RECEIVE_COMMENTS,
    COMMENT_VOTE,
    ADD_COMMENT,
    UPDATE_COMMENT,
    REMOVE_COMMENT
} from '../actions/comments';

import {objToArray} from '../utils/helpers';

export default function comment (state = {},action){
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                ...action.comments
            }

        case COMMENT_VOTE :

            let objComment = objToArray(state).find(comment=>comment.id===action.id);
            let indice = objToArray(state).indexOf(objComment);
             
            return {...state, [indice]: {...state[indice],voteScore:(action.upVote === true) ? objComment.voteScore+1 : objComment.voteScore-1}};
        
        case ADD_COMMENT:
            
            const nextID = objToArray(state).length;

            return {...state,[nextID]:action.comment};
        
        case UPDATE_COMMENT:
        {
            const arrState = objToArray(state).filter(comment=>comment.id !== action.comment.id);
            const {comment} = action;
            return {...arrState,comment};
        }
            
        case REMOVE_COMMENT:
        {
            const arrState = objToArray(state).filter(comment=>comment.id !== action.id);
            return {...arrState};
        }    
        default:
            return state;
    }
}