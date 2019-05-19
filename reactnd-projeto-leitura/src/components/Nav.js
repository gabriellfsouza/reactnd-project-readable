import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';


import {objToArray} from '../utils/helpers';

class Nav extends Component {
    state = {
        categoriaSelecionada : 'tudo'
    }

    handleChange = (e)=>{
        const category = e.target.value;

        this.setState({
            categoriaSelecionada:category
        });

        this.props.history.push((category !== 'tudo') ? `/categories/${category}` : '/');
        
    }

    handleToHome = (e) => {
        this.setState({categoriaSelecionada:'tudo'})
    }

    render(){
        const {categories} = this.props;
        const {categoriaSelecionada} = this.state;

        return (
            <nav className='nav'>

                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='activate' onClick={this.handleToHome}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/new' exact activeClassName='activate'>
                            Novo post
                        </NavLink>
                    </li>
                    <li>
                        <div>
                            <select value={categoriaSelecionada} onChange={this.handleChange}>
                                <option  value="tudo">tudo</option>
                                {objToArray(categories).map(category=>(
                                    <option key={category.path} value={category.path}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </li>
                </ul>
                
            </nav>
        );
    }
}

function mapStateToProps({categories},props){
    return {...props,categories};
}

export default withRouter(connect(mapStateToProps)(Nav));