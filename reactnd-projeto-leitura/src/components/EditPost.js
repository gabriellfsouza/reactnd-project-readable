import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {handleAddPost,handleUpdatePost} from '../actions/posts';
import {objToArray} from '../utils/helpers'

class EditPost extends Component {
    state = {
        id : undefined,
        body:'',
        author:'',
        title:'',
        category:'',
        toHome:false,
    }

    updatePost = (post) => {
        this.setState({...post});
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

        const { body,author,title,category } = this.state;

        const {dispatch, editMode, post,handleCompleteEdit} = this.props;
        

        if(!editMode){
            dispatch(handleAddPost({body,author,title,category}));
        }else{
            dispatch(handleUpdatePost({...post,title,body}))
            .then(handleCompleteEdit());
        }

        console.log('Novo post: ',this.state);

        this.setState(()=>({
            body:'',
            title:'',
            category: '',
            toHome: (post && post.id) ? false : true,
        }));
    }

    componentWillMount(){
        const {editMode=false,post,categories} = this.props;
        
        if(editMode === true){
            this.updatePost(post);
        }else if(categories && objToArray(categories).length){
            this.setState({category:categories[0].path});
        }
    }

    render(){
        let {body,author,title,category,toHome} = this.state;
        const {categories,editMode=false} = this.props;

        if(toHome===true){
            return <Redirect to='/' />
        }

        /*if(!category && categories){
            category = categories[0];
        }*/

        const textLeft = 280 - body.length;

        return (
            <div>
                {!editMode 
                ? <h3 className='center'>Nova postagem</h3>
                : <br />}
                <form className='new-post' onSubmit={this.handleSubmit}>
                    <input 
                        placeholder='Título do post.'
                        value={title}
                        onChange={this.handleChange}
                        name='title'
                     />
                    <textarea
                        placeholder='Texto do post.'
                        value={body}
                        onChange={this.handleChange}
                        className='textarea'
                        maxLength={280}
                        name='body'
                    />{textLeft < 100 && (
                        <div className='post-length'>
                            {textLeft}
                        </div>
                    )}
                    {editMode !== true && <input 
                        placeholder='Autor'
                        value={author}
                        onChange={this.handleChange}
                        name='author'
                    />}
                    {editMode !== true && <select 
                        onChange={this.handleChange}
                        name='category'
                        value={category}
                    >
                        {objToArray(categories).map(category=>(
                            <option key={category.path} value={category.path}>{category.name}</option>
                        ))}
                    </select>}
                    <button 
                        className='btn'
                        type='submit'
                        disabled={body===''}>
                        Enviar
                    </button>
                </form>
            </div>
        );
    }
}

function mapStateToProps({categories,posts},props){
    const {id} = props;
    if(id){
        const post = objToArray(posts).find(post=>post.id===id);
        return {...props,categories,post}
    }else{
        return {...props,categories}
    }
}

export default connect(mapStateToProps)(EditPost);