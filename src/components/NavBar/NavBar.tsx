import React from 'react'
import { BrowserRouter as Router, NavLink } from 'react-router-dom'

import logo from '../resources/logo.svg'
import './NavBar.scss'

function NavBar(): JSX.Element {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">
            <img src={logo} className="app-logo" alt="logo" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/my-list">List Demo</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
