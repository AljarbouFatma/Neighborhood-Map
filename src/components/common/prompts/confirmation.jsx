import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../redux/actions/'


const DeleteConfirmation = ({message,resource,record,actions}) => {
  const {crudAction} = actions
  const submit = () => {
    crudAction({
      type:"delete",
      resource
    }, {_id:record._id})
  }
  return (
    <div className="grid-x grid-padding-x grid-padding-y grid-margin-x grid-margin-y align-center align-middle text-center" style={{height:"100%"}}>
      <div className="cell">
        <h4>{message}</h4>
      </div>
      <div className="cell">
        <button className="button" onClick={submit}> Submit</button>
      </div>
    </div>
  )
}



const mapDispatchToProps = dispatch => ({
  actions:bindActionCreators(Actions,dispatch)
})

export default connect (
  null, //state=>state,
  mapDispatchToProps
)(DeleteConfirmation)
