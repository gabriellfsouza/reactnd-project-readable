import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {MdComment,MdExposureNeg1,MdExposurePlus1,MdRemoveCircle,MdEdit,MdCancel} from 'react-icons/md';
import {Link, withRouter} from 'react-router-dom';

import EditPost from './EditPost';

import {objToArray,formatDate} from '../utils/helpers';
import {handleVotePost,handleRemovePost} from '../actions/posts';

class Post extends Component {

    state = {
        editMode:false
    }

    aumentaScore = (e)=>{
        e.preventDefault();

        const {post,contabilizaVoto}   = this.props;
        contabilizaVoto(post.id,true);
    }

    diminuiScore = (e)=>{
        e.preventDefault();

        const {post,contabilizaVoto}   = this.props;
        contabilizaVoto(post.id,false);
    }

    removePost = (e)=>{
        e.preventDefault();
        const {id,removePostDisp} = this.props;

        removePostDisp(id);
    }

    toParent = (e,id)=>{
        const {path} = this.props
        e.preventDefault();
        this.props.history.push(`/${path}/${id}`);
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
        const {post,path} = this.props;

        const {editMode} = this.state;

        if(post === null){
            return <p>Este post não existe.</p>
        }
        
        const {id,timestamp,title,body,author,category,voteScore,commentCount} = post;
        return(
            <Fragment>
                <Link to={`/${path}/${id}`} className='post' >
                
                    <div className='post-info'>
                        <div>
                            <span>{title}</span>
                            <div>{formatDate(timestamp)} por <span>{author} - {category}</span></div>
                            <p>{body}</p>
                        </div>
                        <div className='post-icons'>
                            <button onClick={(e)=> this.toParent(e,id)} className='updown-button' >
                                <MdComment className='post-icon'/>
                            </button>
                            <span>{commentCount > 0 && commentCount}</span>
                            <button onClick={this.diminuiScore} className='updown-button' >
                                <MdExposureNeg1 className='post-icon' /> 
                            </button>
                            <button onClick={this.aumentaScore} className='updown-button' >
                                <MdExposurePlus1 className='post-icon' />
                            </button>
                            <span>{voteScore !== 0 && voteScore}</span>
                            {editMode===false && <button  onClick={this.removePost} className='updown-button'>
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
                {editMode === true && <EditPost 
                    post={post} 
                    editMode={true} 
                    handleCompleteEdit={this.handleCompleteEdit}
                />}
            </Fragment>
        )
    }
}

function mapStateToProps({posts},{id,...props}){
    const post = objToArray(posts).find(post=>post.id===id);
    //talvez tenha a necessidade de incluir mais objetos aqui.
    const {category} = props.match.params;
    
    //debugger;

    return {
        post:post?post:null,
        path:category?category:'path'
    };
}

function mapDispatchToProps(dispatch){
    return {
        contabilizaVoto : (id,upVote) => dispatch(handleVotePost({
            id,
            upVote
        })),
        removePostDisp : (id) => dispatch(handleRemovePost(id))
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Post));