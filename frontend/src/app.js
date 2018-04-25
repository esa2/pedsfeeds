import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
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
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    this.setState({ isAuthenticating: false })
  }  
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  handleLogout =  async event => {
    await Auth.signOut()
    this.userHasAuthenticated(false)
    this.props.history.push('/signin')
  }

  render() {

    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }

    return (
      !this.state.isAuthenticating &&
      <div className="app container">
        <Navbar className="navbar" fluid collapseOnSelect>
        <Navbar.Header>
         <div>
           <a href="/">
           <img src="https://s3-us-west-2.amazonaws.com/pedsfeeds/images/logo.png"  alt="pedsfeeds" />
           </a>
          </div>
          </Navbar.Header>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/about">About</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
            {this.state.isAuthenticated
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
              : <Fragment>
                  <LinkContainer to="/signin">
                    <NavItem>Sign in</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <NavItem>Sign up</NavItem>
                  </LinkContainer>
                </Fragment>
            }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    )
  }
}
export default withRouter(App)
