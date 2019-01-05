
module.exports = prettyError = err => {
  const {errors} = err
  if(errors) {
    var prettified = {}
    for(var key in errors){
      prettified[key] = errors[key].kind
    }
    return prettified
  } else {
    console.log("Non Mongoose Error:",err)
    return {"unknown":""}
  }
}
