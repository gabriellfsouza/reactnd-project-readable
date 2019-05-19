import React, {Component} from 'react';
import {connect} from 'react-redux';

import {objToArray} from '../utils/helpers';


class EditPost extends Component{

    

    render(){
        const {title,body} = this.props;

        const textLeft = 280 - body.length;

        return (
            
            <form className='new-post' onSubmit={this.handleSubmit}>
                    <input 
                        placeholder='Título do post.'
                        value={title}
                        onChange={this.handleChange}
                        name='title'
                     />
                    <textarea
                        placeholder='Texto do novo post.'
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
            </form>
        )
    }
}

function mapStateToProps({posts},{id}){
    const post = objToArray(posts).find(post=>post.id===id);

    return {post}
}

export default connect()(EditPost);