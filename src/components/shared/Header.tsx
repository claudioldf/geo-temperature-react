import React, { Component } from 'react'
import './Header.scss';

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            Loadsmart Weather
          </a>
        </div>
      </nav>
    )
  }
}

export default Header
