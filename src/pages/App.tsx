import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.scss'
import NavBar from '../components/NavBar'
import MyList from './MyList'
import Home from './Home'

function App(): JSX.Element {
  return (
    <Router>
      <div className="main-app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-list" element={<MyList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
