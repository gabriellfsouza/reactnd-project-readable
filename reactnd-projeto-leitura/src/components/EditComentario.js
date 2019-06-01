import React, {Component} from 'react';
import {connect} from 'react-redux';

import {handleAddComment,handleUpdateComment} from '../actions/comments';
import {objToArray} from '../utils/helpers'

class EditComentario extends Component{
    state = {
        body:'',
        author:'',
        parentId:'',
    }

    handleChange = (e)=>{
        const {name,value} = e.target;
        
        this.setState((oldState)=>{
            oldState[name] = value;
            return oldState;
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        
        const { body,author } = this.state;

        const {dispatch,  editMode, comment,handleCompleteEdit,parentId,post} = this.props;
        
        
        if(!editMode){
            dispatch(handleAddComment({body,author,parentId},post));
        }else{
            dispatch(handleUpdateComment({...comment,body}))
            .then(handleCompleteEdit());
        }

        console.log('Novo comentário: ',this.state);

        this.setState(()=>({
            body:'',
            title:'',
            category: '',
        }));
    }

    updateComment = (comment) => {
        this.setState({...comment});
    }

    componentWillMount(){
        const {editMode=false,comment} = this.props;

        if(editMode === true){
            this.updateComment(comment);
        }
    }

    render(){

        const {editMode=false} = this.props;
        const {author,body} = this.state;

        return <div>
            {!editMode 
                ? <h3 className='center'>Novo comentário</h3>
                : <br />}
            <form className='new-post' onSubmit={this.handleSubmit}>
                <textarea
                    placeholder='Texto do comentário.'
                    value={body}
                    onChange={this.handleChange}
                    className='textarea'
                    maxLength={280}
                    name='body'
                />
                {!editMode && <input 
                    value={author}
                    name='author'
                    onChange={this.handleChange}
                    placeholder='Autor.'
                />}
                <button 
                    className='btn'
                    type='submit'
                    disabled={body==='' || author===''}>
                    Enviar
                </button>
            </form>
        </div>
    }
}

function mapStateToProps({categories,comments,posts},{parentId,...props}){
    const {id} = props;
    const post = objToArray(posts).find(post=>parentId===post.id);
    if(id){
        const comment = objToArray(comments).find(comment=>comment.id===id);
        return {...props,categories,comment,post}
    }else{
        return {...props,categories,post}
    }
}

export default connect(mapStateToProps)(EditComentario);