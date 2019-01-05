import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as Actions from '../../redux/actions/'
import FormContainer from '../common/form/formContainer'
import {TextField} from '../common/form/renderFields'
import {required,email} from '../../helpers/validations'
import { Field } from 'redux-form'

// const path = process.env.NODE_ENV==='development'?'http://localhost:3001':''

const Register = props => {
  return (
    <FormContainer resource="users" >
      <div className="grid-container" style={{margin:"10%"}}>
        <div className="grid-x align-center">
          <div className="cell small-12 medium-8 large-4">
            <Field
              name="email"
              component={TextField}
              type="text"
              label="email"
              validate={[required,email]}
            />
            <Field
              name="password"
              component={TextField}
              type="password"
              label="password"
              validate={[required]}
            />
            <button className="button" type="submit">Submit</button>
          </div>
        </div>
      </div>
    </FormContainer>
    )
}

const mapStateToProps = state => state
const mapDispatchToProps = dispatch => ({
  actions:bindActionCreators(Actions,dispatch)
})


export default  connect (
  mapStateToProps,
  mapDispatchToProps
)(Register)
