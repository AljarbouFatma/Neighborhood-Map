import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field } from 'redux-form'

import * as Actions from '../../redux/actions/'
import FormContainer from '../common/form/formContainer'
import {TextField} from '../common/form/renderFields'
import {required,email} from '../../helpers/validations'


class Login extends React.Component {

  componentDidUpdate(){
    const {authorized} = this.props.users.auth
    const {history} = this.props
    if(authorized) {
      history.push('/articles')
    }
	}

  render(){
    const {asyncAction} = this.props.actions
    const submit = values => {
      asyncAction('authorize',values)
		}

    return (
      <FormContainer resource="login" submit={submit}>
        <div className="grid-container" style={{margin:"10%"}}>
          <div className="grid-x align-center grid-padding-x grid-padding-y">
						<div className="cell small-12 medium-8 large-4 app-item">
							<div><h3><b>Login</b></h3></div>
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
}

const mapDispatchToProps = dispatch => ({
  actions:bindActionCreators(Actions,dispatch)
})

export default  connect (
 	state => state,
	mapDispatchToProps,
	null,
	{pure:false}
)(Login)
