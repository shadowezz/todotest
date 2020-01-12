import React from 'react'
import {Link} from "react-router-dom"

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg justify-content-end">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <span className="navbar-text">Logged in with {localStorage.getItem("email")}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-primary btn-sm">
                    <Link className="nav-link" to="/" onClick={() => this.props.handleLogout}>Logout</Link>
                  </button>
                </li>
              </ul>
            </nav>
        )
    }
}

export default NavBar