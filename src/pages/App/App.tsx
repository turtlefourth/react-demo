import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.scss'
import { Container } from '@mui/material'

import NavBar from '../../components/NavBar/NavBar'
import MyList from '../MyList/MyList'
import Home from '../Home/Home'

function App(): JSX.Element {
  return (
    <Router>
      <Container className="main-app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-list" element={<MyList />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App
