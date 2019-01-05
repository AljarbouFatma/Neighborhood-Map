import React from 'react'
import ReactFilestack from 'filestack-react';
import Flatpickr from 'react-flatpickr'
import ReactQuill from 'react-quill'
import { SketchPicker } from 'react-color'

const path = process.env.NODE_ENV==='development'?'http://localhost:3001':''

export const TextField  = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>
      <span>{label}</span>
      {touched && error && <span style={{color:"red"}}>{error}</span>}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
    </div>
  </div>
)

export const TextAreaField  = ({ input, label, rows, meta: { touched, error } }) => (
  <div>
    <label>
      <span>{label}</span>
      {touched && error && <span style={{color:"red"}}>{error}</span>}
    </label>
    <div>
      <textarea {...input} rows={rows} placeholder={label} />
    </div>
  </div>
)

export const SelectField = ({readValue,options,input,label,rows,meta:{touched,error}}) => {
	var originalOnChange = input.onChange
	input.onChange = e => {
		if(readValue){
			readValue(e.target.value)
		}
		return originalOnChange(e)
	}
	return (
    <div>
      <label>
        <span>{label}</span>
        {touched && error && <span style={{color:"red"}}>{error}</span>}
      </label>
      <div>
        <select {...input}>
          <option value=""></option>
          {options && options.map(option=>
            <option key={option.value} value={option.value}>{option.text}</option>
          )}
        </select>
      </div>
    </div>
  )
}

export const DateField = ({label,input}) => {
  return (
    <div>
      <label>
        <span>{label}</span>
      </label>
      <Flatpickr
        data-enable-time
        options={{
          altInput: true,
          defaultDate:input.value || null
        }}
        onChange={v=>input.onChange(Date.parse(v[0]))}
      />
    </div>

  )
}

export class FileStackField extends React.Component {
  constructor(props){
    super(props)
    this.state={image:""}
  }
  render(){
    const {input} = this.props
    const fileStackProps = {
      apikey:"AOa1bxdAIQ02ckn1tmqRzz",
      options:{
        maxFiles: 1,
      },
      buttonClass:"button hollow expanded",
      buttonText:"Upload",
      onSuccess:response => {
        this.setState({image:response.filesUploaded[0].url})
        input.onChange(response.filesUploaded[0].url)
      }
    }
    return (
      <div>
        <ReactFilestack {...fileStackProps}/>
        {(this.state.image || input.value) &&
          <div className="grid-x align-center">
            <div className="cell small-12 medium-7 large-5">
              <img alt="" width="100%" src={this.state.image || input.value} />
            </div>
          </div>
        }
      </div>
    )
  }
}

export const ToggleField = props => {
	const {label,input} = props
	return (
		<div className="switch" style={{height:"3.5rem"}}>
			<label>{label}</label>
			<input className="switch-input" id={label+input.name} type="checkbox"
				onClick={()=>input.onChange(!input.value)}
				defaultChecked={input.value}
			/>
			<label className="switch-paddle" htmlFor={label+input.name}>
				<span className="show-for-sr">{label}</span>
				<span className="switch-active" aria-hidden="true">Yes</span>
				<span className="switch-inactive" aria-hidden="true">No</span>
			</label>
		</div>
	)
}

export const QuillField = props => {
	const {label,input,height="400px"} = props
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image','video'],
      ['clean']
    ],
  }
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image','video'
  ]
	return (
		<div>
			<label>{label}</label>
			<ReactQuill
				style={{height}}
        modules={modules}
        formats={formats}
				value={input.value}
				onChange={input.onChange}
			/>
		</div>
	)
}





export class UploadPhoto extends React.Component {
  constructor(props){
    super(props)
    this.handleImageChange=this.handleImageChange.bind(this)
    this.state={
      receivedImage:""
    }
  }
  handleImageChange(e) {
     e.preventDefault();
    let {files} = e.target;
    console.log(files);
     //initialize formdata to package file to server
     let formData = new FormData();

     formData.append("example-file",files[0])
     fetch(`${path}/api/v1/image`, { method: 'post', body: formData })
      .then(response=>response.ok ? response.json() : null)
      .then(receivedImage=>receivedImage ? this.setState({receivedImage}) : alert("didnt work"))
 }
  render(){

    return (
      <div className="cell large-4 medium-6 small-12 app-item">
        <label htmlFor="exampleFileUpload" style={{margin:"auto"}} className="button expanded">Upload A Photo</label>
        <input type="file" id="exampleFileUpload" onChange={this.handleImageChange} className="show-for-sr"/>
        {/* <img src={this.state.receivedImage} /> */}
      </div>
    )
  }
}





export class ColorPickerField extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			pickerActive:false
		}
	}
	render(){
		const {label,input} = this.props
		const {pickerActive} = this.state  //  <--- currentColor param,
		return (
			<div>
				<div style={{fontSize:"85%"}}>{label}</div>
				<div
					style={{
						boxShadow:"inset 0 1px 2px rgba(10, 10, 10, 0.1)",
						border:"solid rgba(0,0,0,0.2) 1px",
						borderRadius:"3px",
						padding:"7px",
						cursor:"pointer",
						margin:"3px"
					}}
					onClick={() => this.setState({pickerActive:!pickerActive})}
				>
					{input.value ? <span style={{fontWeigth:"700",color:input.value}}>{input.value}</span> : <span style={{color:"rgba(0,0,0,0.4)"}}>choose a color</span>}
				</div>
				{pickerActive &&
					<SketchPicker
						onChangeComplete={({hex}) => input.onChange(hex)}
						color={input.value}
					/>
				}
			</div>
		)
	}
}
