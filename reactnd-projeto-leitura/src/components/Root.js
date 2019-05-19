import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post';
import { objToArray } from '../utils/helpers';

class Root extends Component {
    
    state = {
        ordenacao:'data'
    }

    handleChangeOrder = (e)=>{
        //debugger;
        const ordenacao = e.target.value;

        this.setState({ordenacao});
    }

    ordenaPosts = (ordenacao,posts = []) =>{
        //debugger;
        switch (ordenacao) {
            case 'score':
                return posts.sort((a,b)=>b.voteScore - a.voteScore);
            default:
                return posts.sort((a,b)=>b.timestamp - a.timestamp);
        }
    }
    
    render(){
        const {posts} = this.props;
        const {ordenacao} = this.state;

        const arrPosts = objToArray(posts);
        
        return (
            <div>
                <div>Ordenação: </div>
                <select value={ordenacao} onChange={this.handleChangeOrder}>
                    <option value='data' >Data de criação</option>
                    <option value='score' >Score</option>
                </select>
                <h3 className='center'>Linha do tempo</h3>
                {arrPosts.length > 0 && (<ul className='dashboad-list'>
                    {this.ordenaPosts(ordenacao,arrPosts).map(post=>(<li key={post.id}>
                        <Post id={post.id} key={post.id} />
                    </li>))}
                </ul>)}
            </div>
        )
    }
}

function mapStateToProps ({posts},props){
    return {...props,posts} ;
}

export default connect(mapStateToProps)(Root);