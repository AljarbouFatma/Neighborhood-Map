import React from 'react'
import { Field } from 'redux-form'
import FormContainer from '../../common/form/formContainer'
import {
	TextField,
	// TextAreaField,
	FileStackField,
	ToggleField,
	DateField,
	SelectField,
	QuillField
} from '../../common/form/renderFields'
import {required} from '../../../helpers/validations'

class ArticlesForm extends React.Component {
  render(){
    const {article} = this.props
    return (
      <FormContainer record={article} resource="articles">
        <Field
          name="name"
          component={TextField}
          type="text"
          label="name"
          validate={[required]}
        />
				<Field
					name="quoteDate"
					component={DateField}
					label="quote date"
				/>
        <Field
          name="description"
          component={QuillField}
          label="description"
          rows={12}
          validate={[required]}
				/>
				<div style={{padding:"40px"}}/>
				<Field
					name="image"
					component={FileStackField}
				/>
				<Field
					name="visible"
					component={ToggleField}
					label="visible"
				/>
				<Field
					name="category"
					component={SelectField}
					label="category"
					options={[
						{value:"inspirational",text:"inspirational"},
						{value:"non-inspirational",text:"non-inspirational"},
						{value:"kinda-inspirational",text:"kinda-inspirational"}
					]}
				/>
        <button className="button" type="submit">Submit</button>
      </FormContainer>
    )
  }
}

export default ArticlesForm
