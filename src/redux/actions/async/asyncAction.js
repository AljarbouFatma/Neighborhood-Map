const hostname = process.env.NODE_ENV === "development" ? 'http://localhost:3001' : ""

//accounts for development environment
const url = path => hostname+path

//initializes with action type and store section affected, activated with status and bool
const status = (type,section) => (status,bool) =>
  ({ type,section,status,bool })

//initializes with action type and activated with a pkg
const success = type => pkg =>
  ({ type,pkg })

//initializes with action type and affected form, activated with error pkg {err:{...}}
const error = (type,form) => pkg =>
  ({ type, meta:{ form }, payload:{ syncErrors:pkg.err } })

const options = method => pkg => ({
  method,
  headers: {
   'Accept':'application/json',
   'Content-Type':'application/json',
   'Authorization':localStorage.getItem('pi')
  },
  body:JSON.stringify(pkg)
})

const actions = {
  authorize:{
    url:url('/api/v1/auth'),
    status:status("USERS_STATUS","auth"),
    success:success('AUTHORIZE_USER'),
    error:error("@@redux-form/UPDATE_SYNC_ERRORS","login"),
    options:options("POST")
  },
  token:{
    url:url('/api/v1/token'),
    status:status("USERS_STATUS","auth"),
    success:success('AUTHORIZE_USER'),
    options:options("GET")
  }
}

export const asyncAction = (key,pkg,query="") => dispatch => {
  const newAction = actions[key]
  dispatch(newAction.status('loading',true))
  dispatch(newAction.status('error',false))
  fetch(newAction.url + (query ? "?" + query : ""),newAction.options(pkg))
    .then(response => {
      dispatch(newAction.status('loading',false))
      if(response.ok){
        response.json().then(data =>
          dispatch(newAction.success(data))
        )
      } else {
        response.json().then(data => {
          if(newAction.error){
            dispatch(newAction.error(data))
          } else {
            console.log("No error handling given for async action");
          }
        })
      }
    })
    //figure out how to deal with server error
    .catch(error => console.log("******",error))
}
