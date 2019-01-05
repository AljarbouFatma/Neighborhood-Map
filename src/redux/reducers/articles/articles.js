import { initialState } from '../../initialState';

import crudReducers from '../default/crudReducer';
const articleCrudReducer = crudReducers('articles')

const articles = (state=initialState.articles,action) => {
  // console.log(action);
  //override crud stuff here
  return articleCrudReducer(state,action)
}

export default articles
