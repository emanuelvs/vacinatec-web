import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import ReduxSaga from 'redux-saga';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import rootRedux from './store/root';
import rootSaga from './store/root/rootSaga';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api/v1';
axios.defaults.headers.common['Authorization'] = '';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


const sagaMiddleware = ReduxSaga();

const store = createStore(rootRedux, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
