import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap"
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import Routes from './routes'
import './styles/app.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    }
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true)
      }
    } catch (e) {
      if (e !== "No current user") {
        alert(e)
      }
    }

    this.setState({ isAuthenticating: false })
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  handleLogout = async event => {
    await Auth.signOut()
    this.userHasAuthenticated(false)
    this.props.history.push("/signin")
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }

    return (
      !this.state.isAuthenticating && (
        <div className="app container">
          <Navbar className="navbar" fluid collapseOnSelect>
            <Navbar.Header>
              <div>
                <a href="/">
                  <img
                    src="https://s3-us-west-2.amazonaws.com/pedsfeeds/images/logo.png"
                    alt="pedsfeeds"
                  />
                </a>
              </div>
              <Navbar.Toggle />
            </Navbar.Header>
            <Nav>
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <MenuItem header>FAMILIES</MenuItem>
                <MenuItem href="#">Find a Provider</MenuItem>
                <MenuItem href="resources">Find Resources</MenuItem>
                <MenuItem divider />
                <MenuItem header>PROVIDERS</MenuItem>
                <MenuItem href="join">How to Join</MenuItem>
                <MenuItem href="providers">Find Resources</MenuItem>
                <MenuItem divider />
                <MenuItem header>OTHER</MenuItem>
                <MenuItem href="education">Continuing Education</MenuItem>
                <MenuItem href="jobs">Community Jobs</MenuItem>
                <MenuItem href="faq">FAQs</MenuItem>
                <MenuItem href="#">Terms and Conditions of Use</MenuItem>
                <MenuItem href="#">Contact Us</MenuItem>
                <MenuItem href="/about">About Us</MenuItem>
                <MenuItem divider />
                <MenuItem href="/">Home</MenuItem>
              </NavDropdown>
            </Nav>
            <Navbar.Collapse>
              <Nav pullRight>
                {this.state.isAuthenticated ? (
                  <NavItem onClick={this.handleLogout}>Logout</NavItem>
                ) : (
                  <Fragment>
                    <LinkContainer to="/signin">
                      <NavItem>Sign in</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                      <NavItem>Sign up</NavItem>
                    </LinkContainer>
                  </Fragment>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Routes childProps={childProps} />
          <footer className="footer">
            </footer>
        </div>
      )
    )
  }
}
export default withRouter(App)
