import { showLoading, hideLoading } from 'react-redux-loading';

import { saveCommentVote, newComment, removeComment, updateComment } from '../utils/api';
import {UPDATE_POST,handleUpdatePost} from './posts';


export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const COMMENT_VOTE = 'COMMENT_VOTE';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';


export function receiveComments(comments){
    return{
        type: RECEIVE_COMMENTS,
        comments,
    }
}

function atualizaComentario(comment){
    return {
        type: UPDATE_COMMENT,
        comment,
    }
}

export function handleUpdateComment (comment){

    const timestamp = new Date().getTime();

    return (dispatch,getState) => {
        dispatch(showLoading());
        return updateComment(comment.id,{...comment,timestamp})
                .then((comment)=>dispatch(atualizaComentario(comment)))
                .then(dispatch(hideLoading()))
                .catch((e)=>{
                    console.group('Erro na atualização');
                    console.log('Mensagem: ',e);
                    console.groupEnd();
                    alert('Erro na atualização');
                });
    }
}

function deletaComentario (id){
    return {
        type: REMOVE_COMMENT,
        id,
    }
}

export function handleRemoveComment(id,post){
    post.voteScore = post.voteScore -1;
    return(dispatch,getState)=>{
        dispatch(showLoading());
        return removeComment(id)
                .then(data=>{
                    
                    return (!data.error) ? Promise.resolve(data) : Promise.reject(data.error);
                })
                .then(({id})=>{return dispatch(deletaComentario(id));})
                .then(()=>dispatch(hideLoading()))
                .then(dispatch(handleUpdatePost(post)))
                .catch((e)=>{
                    console.group('Erro na remoção');
                    console.log('Mensagem: ',e);
                    console.groupEnd();
                    alert('Erro na remoção')
                });
    }
}

function addComment (comment){
    return {
        type:ADD_COMMENT,
        comment,
    }
}

export function handleAddComment(comment,post){
    const {id,timestamp} = comment;

    comment.id = id || Math.random().toString(36).substr(-8);
    comment.timestamp = timestamp || (new Date()).getTime();
    
    post.voteScore = post.voteScore + 1;

    console.log('HandleComment ', comment)
    return (dispatch,getState) =>{
        
        dispatch(showLoading());
        return newComment(comment)
            .then((comment)=>{
                return dispatch(addComment(comment));
            })
            .then(dispatch(handleUpdatePost(post)))
            .then(()=>dispatch(hideLoading()))
            .catch((e)=>{
                    console.group('Erro na inclusão');
                    console.log('Mensagem: ',e);
                    console.groupEnd();
                    alert('Erro na inclusão');
                });
    }
}


function commentVote({id,upVote}){
    return{
        type:COMMENT_VOTE,
        id,
        upVote,
    }
}

export function handleVoteComment(info){
    return (dispatch) =>{

        dispatch(commentVote(info));

        return saveCommentVote(info)
        .then((data)=>{
            console.log('Ok: ',data);
            return Promise.resolve(data);
        })
        .catch((e)=>{
            console.warn('Erro ao gravar o voto no comentário: ',e);
            info.upVote = !info.upVote;
            dispatch(commentVote(info));
            alert('Houve um erro ao tentar gravar o voto no comentário, tente novamente.');
            return Promise.reject(e);
        });
    }
}


