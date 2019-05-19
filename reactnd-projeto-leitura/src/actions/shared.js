import {showLoading,hideLoading} from 'react-redux-loading';

import {getInitialData,getCommentData} from '../utils/api';
import {receivePosts} from '../actions/posts';
import {receiveCategories} from '../actions/categories';
import {receiveComments} from '../actions/comments';

export function handleInitialData(){
    return (dispatch)=>{
        dispatch(showLoading())
        return getInitialData()
        .then(({posts,categories})=>{
            dispatch(receivePosts(posts));
            dispatch(receiveCategories(categories));
            /*dispatch(receiveComments([]));
            dispatch(hideLoading());
            */
            Promise.all(posts.map(post=>getCommentData(post)))
            .then((arr)=>{
                
                const comments = [];
                arr.forEach(postComments=>{
                    postComments.forEach(comment=>{
                        comments.push(comment);
                    });
                });
                
                dispatch(receiveComments({...comments}));
                dispatch(hideLoading());
            });

            
            //dispatch(receiveComments([]));
            
        })
    }
}
