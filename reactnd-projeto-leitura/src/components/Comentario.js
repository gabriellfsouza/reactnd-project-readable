import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import { MdCancel, MdEdit, MdRemoveCircle, MdExposurePlus1, MdExposureNeg1 } from 'react-icons/md';
import {Link} from 'react-router-dom';

import EditComentario from './EditComentario';

import { formatDate, objToArray } from '../utils/helpers';
import {handleVoteComment,handleRemoveComment} from '../actions/comments';


class Comentario extends Component{
    state = {
        editMode : false
    }

    aumentaScore = (e)=>{
        e.preventDefault();

        const {comment,contabilizaVoto}   = this.props;
        contabilizaVoto(comment.id,true);
    }

    diminuiScore = (e)=>{
        e.preventDefault();

        const {comment,contabilizaVoto}   = this.props;
        contabilizaVoto(comment.id,false);
    }

    removeComment = (e)=>{
        e.preventDefault();
        const {id,removeCommentDisp,post} = this.props;

        removeCommentDisp(id,post);
    }

    toParent = (e,id)=>{
        e.preventDefault();
        this.props.history.push(`/comment/${id}`);
    }

    handleEdit = (e)=>{
        e.preventDefault();
        this.setState({editMode:true});
    }

    handleCancel = (e)=>{
        e.preventDefault();
        this.handleCompleteEdit();
    }

    handleCompleteEdit = ()=>{
        this.setState({editMode:false});
    }

    render(){
        
        const {editMode} = this.state;
        const {comment} = this.props;
        const {id,timestamp,author,body,voteScore,parentId} = comment;

        return <Fragment>
        <Link to={`/post/${parentId}/comments/${id}`} className='post' >
        
            <div className='post-info'>
                <div>
                    <div>{formatDate(timestamp)} por <span>{author}</span></div>
                    <p>{body}</p>
                </div>
                <div className='post-icons'>
                    <button onClick={this.diminuiScore} className='updown-button' >
                        <MdExposureNeg1 className='post-icon' /> 
                    </button>
                    <button onClick={this.aumentaScore} className='updown-button' >
                        <MdExposurePlus1 className='post-icon' />
                    </button>
                    <span>{voteScore !== 0 && voteScore}</span>
                    {editMode===false && <button  onClick={this.removeComment} className='updown-button'>
                        <MdRemoveCircle className='post-icon'/>
                    </button>}

                    {editMode===false 
                    ? <button onClick={this.handleEdit} className='updown-button' >
                            <MdEdit className='post-icon' />
                        </button> 
                    : <button onClick={this.handleCancel} className='updown-button' >
                            <MdCancel className='post-icon' />
                        </button>}
                </div>
            </div>
        </Link>
        {editMode === true && <EditComentario 
            comment={comment} 
            editMode={true} 
            handleCompleteEdit={this.handleCompleteEdit}
        />}
    </Fragment>;
    }
}

function mapStateToProps({comments,posts},props){
    const {id} = props;
    const comment = objToArray(comments).find(comment=>comment.id === id) || {};
    const {parentId} = comment;
    
    const post = objToArray(posts).find(post=>parentId===post.id);
    return {...props,comment,post};
}

function mapDispatchToProps(dispatch){
    return {
        contabilizaVoto : (id,upVote) => dispatch(handleVoteComment({
            id,
            upVote
        })),
        removeCommentDisp : (id,post) => dispatch(handleRemoveComment(id,post))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Comentario);