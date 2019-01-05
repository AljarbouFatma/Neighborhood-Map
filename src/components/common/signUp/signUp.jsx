import React from 'react'

const path = process.env.NODE_ENV === "development" ? 'http://localhost:3001' : ""

export default class SignupInput extends React.Component {
  constructor(props){
    super(props)
    this.submit = this.submit.bind(this)
    this.state={
      success:false,
      error:false
    }
  }
  submit = e => {
    e.preventDefault()
    const email = this.refs.email.value
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email)){
      fetch(`${path}/api/v1/email`,{
        method:"POST",
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body:JSON.stringify({email})
      }).then(response=>response.json())
      .then(data=>{
        console.log(data);
        if(data.status==="success"){
          this.setState({success:true})
        } else {
          this.setState({error:true})
        }
      })
    } else {
      this.refs.email.style.border = "solid red 1px"
    }
  }
  render(){
    const {success,error} = this.state
    if(error) return <div>An Error Has Occured</div>
    if(success) return <div style={{border:"solid white 1px",borderRadius:"2px",padding:"5px"}}><b><h4>Success! Stay Tuned For Updates!</h4></b></div>
    return(
      <form className="sign-up">
        <div className="input-group">
          <input className="input-group-field" placeholder="email address" type="text" ref="email"/>
          <div className="input-group-button">
            <input className="button hollow" type="submit" value="Sign Up" onClick={this.submit} />
          </div>
        </div>
      </form>
    )
  }
}
