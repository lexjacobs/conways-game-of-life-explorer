import React, { Component } from 'react';
import './App.css';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './reducers/root.js';
import Gameboard from './components/Gameboard/index.js';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Gameboard/>
      </Provider>
    );
  }
}

export default App;
