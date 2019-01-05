const crudReducers = resource => (state,action) => {
  const resourceType = resource.toUpperCase()
  if (action.type===`${resourceType}_STATUS`) executeResourceStatus(state,action.section,action.status,action.bool)
  if (action.type===`GET_${resourceType}_SUCCESS`) executeGetResourceSuccess(state,action.pkg)
  if (action.type===`POST_${resourceType}_SUCCESS`) executePostResourceSuccess(state,action.pkg)
  if (action.type===`PUT_${resourceType}_SUCCESS`) executePutResourceSuccess(state,action.pkg)
  if (action.type===`DELETE_${resourceType}_SUCCESS`) executeDeleteResourceSuccess(state,action.pkg)
  return state
}

const executeResourceStatus = (state,section,status,bool) => {
  var newState = state
  newState[section][status] = bool
  return {...state,newState}
}
const executeGetResourceSuccess = (state,pkg) => {
  var newState = state
  newState.list.success = true
  newState.list._list = pkg
  return {...state,newState}
}
const executePostResourceSuccess = (state,pkg) => {
  var newState = state
  newState.list.success = true
  newState.list._list.push(pkg)
  return {...state,newState}
}
const executePutResourceSuccess = (state,pkg) => {
  var newState = state
  const index = newState.list._list
  .map(item => item._id)
  .indexOf(pkg._id)
  if (~index){
    newState.update.success = true
    newState.list._list[index] = pkg
  } else {
    newState.update.error = true
    console.warn("Returned Pkg Does Not Exist")
    console.log(pkg);
  }
  return {...state,newState}
}
const executeDeleteResourceSuccess = (state,pkg) => {
  var newState = state
  const index = newState.list._list
    .map(item => item._id)
    .indexOf(pkg._id)
  if(~index) {
    newState.list._list.splice(index,1)
    newState.delete.success = true
  } else {
    newState.delete.error = true
  }
  return {...state,newState}
}

export default crudReducers
