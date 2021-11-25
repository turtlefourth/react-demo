import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createStore, applyMiddleware, compose, Store } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import './App.scss'
import { Container } from '@mui/material'

import reducer from '../../store/reducer'
import { UserState, UserAction, DispatchType } from '../../type.d'

import NavBar from '../../components/NavBar/NavBar'
import MyList from '../MyList/MyList'
import MyForm from '../MyForm/MyForm'
import MyRedux from '../MyRedux/MyRedux'
import Home from '../Home/Home'
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store: Store<UserState, UserAction> & {
  dispatch: DispatchType
} = createStore(reducer, compose(applyMiddleware(thunk), composeEnhancers()))

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <Router>
        <Container className="main-app">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/my-form" element={<MyForm />} />
            <Route path="/my-redux" element={<MyRedux />} />
          </Routes>
        </Container>
      </Router>
    </Provider>
  )
}

export default App
