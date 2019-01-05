import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import * as Actions from '../../redux/actions/'
import ArticlesFeed from './feed/articlesFeed'
import ArticlesNav from './nav/articlesNav'
import ArticlesForm from './form/articlesForm'
import Modal from '../common/modal/modal'


class ArticlesContainer extends React.Component {
  render(){
   const {_list} = this.props.list
    return (
      <div className="grid-container">
        <div className="grid-x align-center"><h1>Articles</h1></div>
        <ArticlesNav />
        <ArticlesFeed articles={_list}/>
        <div style={{padding:"50px"}} />
        <Route path="/articles/new" render={()=>
          <Modal med>
            <ArticlesForm />
          </Modal>
        } />
      </div>
    )
  }
}


export default connect (
  state => state.articles,
  dispatch => ({ actions:bindActionCreators(Actions,dispatch) })

)(ArticlesContainer)
