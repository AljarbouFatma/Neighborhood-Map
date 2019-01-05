import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../../redux/actions/'
import FormBody from './formBody'


// takes in resource, optional record, and optional submit
// resource if put, post, or, delete
// record is optional for editing
// submit is for custom submit callback
// children are renderFields


const FormContainer = props => {
  const {crudAction} = props.actions
  const {record,resource,children} = props

  const submit = props.submit ?
    props.submit :
    values => {
    var actionParams = {
      type:record ? "put" : "post",
      resource:resource
    }
    var pkg = record ?
    {_id:record._id,changes:values}:
    {pkg:values}
    crudAction(actionParams,pkg)
  }
  const formBodyProps = {
    onSubmit:submit,
    initialValues:record,
    resource
  }

  return (
    <div>
      <FormBody {...formBodyProps}>
        {children}
      </FormBody>
    </div>
  )
}

const mapStateToProps = state => state.articles
const mapDispatchToProps = dispatch => ({
  actions:bindActionCreators(Actions,dispatch)
})


export default  connect (
  mapStateToProps,
  mapDispatchToProps
)(FormContainer)
