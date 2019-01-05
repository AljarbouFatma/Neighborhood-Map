import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as Actions from '../../redux/actions';

class AuthContainer extends React.Component {
  componentWillMount(){
    this.checkExistingAuth()
  }
  componentDidUpdate(){
    const {authorized,loading,error}  = this.props.users.auth
    const {history} = this.props
    if(authorized) return null
    if(!authorized && !loading && error) history.push('/login')
  }

  checkExistingAuth(){
    const {asyncAction,history}   = this.props
    // const {user}          = this.props.users.auth
    const token           = localStorage.getItem('pi');
    if(token){
      asyncAction('token')
    } else {
      history.push('/login')
    }
  }

  render(){
    const {children} = this.props
    const {authorized} = this.props.users.auth
    if(!authorized) return null
    return children
  }
}


export default withRouter(connect (
  state=>state,
  dispatch => ({asyncAction:bindActionCreators(Actions.asyncAction,dispatch)}),
  null,
  { pure:false }
)(AuthContainer))
