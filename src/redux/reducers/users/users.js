import { initialState } from '../../initialState'
import crudReducers from '../default/crudReducer';
const userCrudReducer = crudReducers('users')

const users = (state=initialState.users,action) => {
  //override crud stuff here
  if (action.type==="AUTHORIZE_USER") executeAuthorizeUser(state,action.pkg)
  return userCrudReducer(state,action)
}

const executeAuthorizeUser = (state,pkg) => {
  var newState = state
  newState.auth.user = pkg
  localStorage.setItem('pi',pkg.password)
  newState.auth.authorized = true
  return {...state,newState}
}


export default users
