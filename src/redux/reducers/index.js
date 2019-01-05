import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'
import articles from  './articles/articles'
import users from './users/users'

const rootReducer = combineReducers({
  articles,
  users,
  form
})

export default rootReducer;
