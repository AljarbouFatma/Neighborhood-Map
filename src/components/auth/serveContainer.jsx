import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/'

class ServeContainer extends React.Component {
  componentWillMount(){
    this.props.actions.crudAction({type:"get",resource:"articles"})
  }
  render(){
    const {children} = this.props
    return children
  }
}

export default connect (
  null,
  dispatch => ({ actions:bindActionCreators(Actions,dispatch) }),
  null,
  { pure:false }
)(ServeContainer)
