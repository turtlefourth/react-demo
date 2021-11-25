import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../../resources/logo.svg'
import './NavBar.scss'

function NavBar(): JSX.Element {
  return (
    <nav>
      <ul className="nav-bar">
        <li className="nav-bar__item">
          <NavLink className="link" to="/">
            <img src={logo} className="app-logo" alt="logo" />
            Home
          </NavLink>
        </li>
        <li className="nav-bar__item">
          <NavLink className="link" to="/my-list">
            List Demo
          </NavLink>
        </li>
        <li className="nav-bar__item">
          <NavLink className="link" to="/my-form">
            Form Demo
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
