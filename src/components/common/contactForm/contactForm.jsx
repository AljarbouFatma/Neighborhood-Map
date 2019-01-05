import React from 'react'
import ReactQuill from 'react-quill'
const path = process.env.NODE_ENV === "development" ? 'http://localhost:3001' : ""



export default class ContactForm extends React.Component {
  constructor(props){
    super(props)
    this.state={
      email:"",
      message:"",
      name:"",
      success:false,
      error:false
    }
    this.sendEmail = this.sendEmail.bind(this)
  }
  sendEmail = e => {
    e.preventDefault()
    const {email,message,name} = this.state
    const {city} = this.props
    if(!email){
      this.refs.email.style.border = "solid red 1px"
    } else if(!name) {
      this.refs.name.style.border = "solid red 1px"
    } else {
      const subject =city ?  `A Message From ${city} Location Page`:
      `A Message From Contact Page`
      fetch(`${path}/api/v1/contact`,{
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        method:"POST",
        body:JSON.stringify({email,message,name,subject})
      }).then(response=>response.json())
      .then(data=>{
        if(data.status==="success"){
          this.setState({success:true})
        } else {
          this.setState({error:true})
        }
      })
    }
  }
  validateEmailInputs = (field,e) => {
    if(field==="email"){
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const emailIsValid = re.test(e.target.value)
      if(emailIsValid){
        this.refs.email.style.border= "solid green 1px"
      } else {
        this.refs.email.style.border = "solid red 1px"
      }
    } else {
      if(e.target.value){
        this.refs[field].style.border = "solid green 1px"
      }
    }
    if(!e.target.value) {
      this.refs[field].style.border = "solid red 1px"
    }
  }
  render(){
    const {
      // email,message,name,
      success,
      // error
    } = this.state
    const quillProps = {
      onChange:e=>this.setState({message:e}),
      style:{height:"300px"}
    }
    const inputProps = field => ({
        onChange:e=>this.setState({[field]:e.target.value}),
        onBlur:e=>this.validateEmailInputs(field,e),
        ref:field
    })
    if(success){
      return (
        <div>
          <div>
            <h4>Success!</h4>
          </div>
          <div>
            We will be in contact shortly. Thanks!
          </div>
        </div>
      )
    }

    return (
      <div className="cell animated fadeIn">
        <div className="grid-x grid-padding-x grid-padding-y ">

        <div className="cell ">
          <div className="grid-x grid-margin-x">
            <div className="cell small-12 medium-6 large-6">
              <input placeholder="email" type="text" {...inputProps("email")}/>
            </div>
            <div className="cell small-12 medium-6 large-6">
              <input placeholder="name" type="text" {...inputProps("name")}/>
            </div>
          </div>
        </div>

        <div className="cell">
          <ReactQuill {...quillProps} />
        </div>
        <div className="cell text-left">
          <button className="button hollow" style={{marginTop:"50px"}} onClick={this.sendEmail}>SUBMIT</button>
        </div>
        </div>
      </div>
    )
  }
}
