import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';

import './components/bundle.scss';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers,applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
    ,document.getElementById('root'));
registerServiceWorker();
