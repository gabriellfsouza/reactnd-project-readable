import React, {Component} from 'react';
import { connect } from 'react-redux';

import Post from './Post';
import Comentario from './Comentario';
import EditComentario from './EditComentario';

import {objToArray} from '../utils/helpers';


function NaoEncontrado(){
    return(
        
            <div>
              <h3>Post não encontrado</h3>
            </div>
    )
}

class PostDetalhes extends Component{
    state = {
        ordenacao:'data'
    }

    handleChangeOrder = (e)=>{
        //debugger;
        const ordenacao = e.target.value;

        this.setState({ordenacao});
    }

    ordenaComentarios = (ordenacao,comentarios = []) =>{
        //debugger;
        switch (ordenacao) {
            case 'score':
                return comentarios.sort((a,b)=>b.voteScore - a.voteScore);
            default:
                return comentarios.sort((a,b)=>b.timestamp - a.timestamp);
        }
    }

    render(){

        console.log('Propriedades do post: ',this.props);
        const {post,postComments} = this.props;
        const {id,commentCount} = post;

        const {ordenacao} = this.state;
        debugger;
        return (post.id)?
            <div>
                <div>Ordenação: </div>
                <select value={ordenacao} onChange={this.handleChangeOrder}>
                    <option value='data' >Data de criação</option>
                    <option value='score' >Score</option>
                </select>
                <Post id={id} />
                <EditComentario parentId={id} />
                {commentCount !== 0 && <h3 className='center'>Comentários</h3>}
                <ul>
                    {this.ordenaComentarios(ordenacao,postComments).map(comment=>(
                        <li><Comentario id={comment.id} key={comment.id} /></li>
                    ))}
                </ul>
            </div>
            : <NaoEncontrado />
        
    }
}

function mapStateToProps({posts,comments},props){
    const {id} = props.match.params;

    //debugger;
    
    const post = objToArray(posts).find(post=>{
        return post.id===id;
    }) || {};
    const postComments = objToArray(comments)
                        .filter(comment=>comment.parentId===post.id)
                        //.sort((a,b)=>b.timestamp > a.timestamp);

    return {post,postComments};
}

export default connect(mapStateToProps)(PostDetalhes);