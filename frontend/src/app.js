import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem } from "react-bootstrap"
import Routes from './routes'
import "./styles/app.css"

class App extends Component {
  render() {
    return (
      <div className="app container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            <LinkContainer to="/signup">
              <NavItem>Sign up</NavItem>
            </LinkContainer>
            <LinkContainer to="/signin">
              <NavItem>Sign in</NavItem>
            </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    )
  }
}
export default App