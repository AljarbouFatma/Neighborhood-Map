import React from 'react'
import {reduxForm} from 'redux-form'

const FormBodyComponent = props => {
  const { handleSubmit,children } = props
  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  )
}

class FormBody extends React.Component {
  constructor(props){
    super(props)
    this._FormBody = null;
  }
  componentWillMount(){
    const {resource} = this.props
    this._FormBody = reduxForm({form:resource})(FormBodyComponent)
  }
  render(){
    const {children} = this.props
    const WrappedFormBody = this._FormBody
    return (
      <WrappedFormBody {...this.props}>
        {children}
      </WrappedFormBody>
    )
  }
}


export default FormBody
