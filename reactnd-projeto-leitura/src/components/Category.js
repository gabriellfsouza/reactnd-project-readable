import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post';
import {objToArray} from '../utils/helpers';

class Category extends Component {
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
        const {posts,category,categories} = this.props;
        const {ordenacao} = this.state;
        //debugger;
        const selectedCategory = objToArray(categories).find(cat=>cat.path===category);

        const arrPosts = objToArray(posts);

        return (
            <div>
                <div>Ordenação: </div>
                <select value={ordenacao} onChange={this.handleChangeOrder}>
                    <option value='data' >Data de criação</option>
                    <option value='score' >Score</option>
                </select>
                <h3 className='center'>{selectedCategory && selectedCategory.name}</h3>
                {arrPosts.length > 0 && (<ul className='dashboad-list'>
                    {this.ordenaPosts(ordenacao,arrPosts).map(post=>(<li key={post.id}>
                        <Post id={post.id} key={post.id} />
                    </li>))}
                </ul>)}
            </div>
        )
    }
}

function mapStateToProps ({posts,categories},props){

    const {category} = props.match.params;
    
    return {...props,
            category,
            categories,
            posts:  {...objToArray(posts)
                        .filter(post=>post.category===category)}};
}

export default connect(mapStateToProps)(Category);