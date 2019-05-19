import { showLoading, hideLoading } from 'react-redux-loading';

import { savePostVote, newPost, removePost, updatePost } from '../utils/api';


export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const POST_VOTE = 'POST_VOTE';
export const ADD_POST = 'ADD_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const UPDATE_POST = 'UPDATE_POST';

export function receivePosts(posts){
    return{
        type: RECEIVE_POSTS,
        posts,
    }
}

function atualizaPost(post){
    return {
        type: UPDATE_POST,
        post,
    }
}

export function handleUpdatePost (post){
    return (dispatch) => {
        dispatch(showLoading());
        return updatePost(post.id,post)
                .then((post)=>dispatch(atualizaPost(post)))
                .then(dispatch(hideLoading()))
                .catch((e)=>{
                    console.group('Erro na atualização');
                    console.log('Mensagem: ',e);
                    console.groupEnd();
                    alert('Erro na atualização');
                });
    }
}

function deletaPost (id){
    return {
        type: REMOVE_POST,
        id,
    }
}

export function handleRemovePost(id){
    return(dispatch)=>{
        dispatch(showLoading());
        return removePost(id)
                .then(({id})=>{ return dispatch(deletaPost(id));})
                .then(()=>dispatch(hideLoading()))
                .catch((e)=>{
                    console.group('Erro na remoção');
                    console.log('Mensagem: ',e);
                    console.groupEnd();
                    alert('Erro na remoção')
                });
    }
}

function addPost (post){
    return {
        type:ADD_POST,
        post,
    }
}

export function handleAddPost(post){
    const {id,timestamp} = post;

    post.id = id || Math.random().toString(36).substr(-8);
    post.timestamp = timestamp || (new Date()).getTime();
    console.log('HandlePost ', post)
    return (dispatch,getState) =>{
        
        dispatch(showLoading());
        return newPost(post)
            .then((post)=>dispatch(addPost(post)))
            .then(()=>dispatch(hideLoading()))
            .catch((e)=>{
                    console.group('Erro na inclusão');
                    console.log('Mensagem: ',e);
                    console.groupEnd();
                    alert('Erro na inclusão');
                });
    }
}


function postVote({id,upVote}){
    return{
        type:POST_VOTE,
        id,
        upVote,
    }
}

export function handleVotePost(info){
    return (dispatch) =>{

        dispatch(postVote(info));

        return savePostVote(info)
        .then((data)=>{
            console.log('Ok: ',data);
            return Promise.resolve(data);
        })
        .catch((e)=>{
            console.warn('Erro ao gravar o voto no post: ',e);
            info.upVote = !info.upVote;
            dispatch(postVote(info));
            alert('Houve um erro ao tentar gravar o voto na postagem, tente novamente.');
            return Promise.reject(e);
        });
    }
}
