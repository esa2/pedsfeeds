import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { Auth } from 'aws-amplify'
import Routes from './routes'
import './styles/app.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    }
  }

  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.userHasAuthenticated(true)
      }
    } catch (e) {
      if (e !== 'No current user') {
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
    this.props.history.push('/signin')
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
    }

    return (
      !this.state.isAuthenticating && (
        <div>
          <Navbar fluid collapseOnSelect>
            <Navbar.Header>
              <a href="/">
                <img
                  src="https://s3-us-west-2.amazonaws.com/pedsfeeds/images/logo.png"
                  alt="pedsfeeds"
                />
              </a>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <NavDropdown title="Menu" id="basic-nav-dropdown">
                  <MenuItem header>FAMILIES</MenuItem>
                  <MenuItem href="consent">Find a Provider</MenuItem>
                  <MenuItem href="resources">Find Resources</MenuItem>
                  <MenuItem divider />
                  <MenuItem header>PROVIDERS</MenuItem>
                  <MenuItem href="join">How to Join</MenuItem>
                  <MenuItem href="providers">Find Resources</MenuItem>
                  <MenuItem divider />
                  <MenuItem header>OTHER</MenuItem>
                  <MenuItem href="library">Library</MenuItem>
                  <MenuItem href="education">Continuing Education</MenuItem>
                  <MenuItem href="jobs">Community Jobs</MenuItem>
                  <MenuItem href="faq">FAQs</MenuItem>
                  <MenuItem href="/about">About Us</MenuItem>
                  <MenuItem href="tos">Terms and Conditions of Use</MenuItem>
                  <MenuItem href="contact">Contact Us</MenuItem>
                </NavDropdown>
                <NavItem href="/">Home</NavItem>
                {this.state.isAuthenticated ? (
                  <Fragment>
                    <LinkContainer to="/profile">
                      <NavItem>Your Listings</NavItem>
                    </LinkContainer>
                    <NavItem onClick={this.handleLogout}>Logout</NavItem>
                  </Fragment>
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
          <div className="wrapper">
            <Routes childProps={childProps} />
          </div>
        </div>
      )
    )
  }
}
export default withRouter(App)
