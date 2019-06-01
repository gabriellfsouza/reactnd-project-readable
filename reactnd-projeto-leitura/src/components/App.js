import React, { Component, Fragment } from 'react';
import LoadingBar from 'react-redux-loading';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {handleInitialData} from '../actions/shared';
import Root from './Root';
import EditPost from './EditPost'
import PostDetalhes from './PostDetalhes';
import Nav from './Nav';

import Category from './Category';

class App extends Component {
  
  componentDidMount(){
    this.props.dispatch(handleInitialData());
  }

  render(){
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            {this.props.loading === true
              ? null
              : <div>
                  <Switch>
                    <Route path='/' exact component={Root} />
                    <Route path='/new' exact component={EditPost} />
                    <Route path='/path/:id' exact component={PostDetalhes} />
                    <Route path='/:category/:id' exact component={PostDetalhes} />
                    <Route path='/:category' exact component={Category} />
                  </Switch>
                </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
  
}

function mapStateToProps({posts}){
  //debugger;
  return {
    loading : posts === null
  }
}

export default connect(mapStateToProps)(App);
