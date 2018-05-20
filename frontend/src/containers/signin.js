import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from 'react-bootstrap'
import LoaderButton from '../components/loader-button'
import '../styles/signin.css'

export default class Signin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      code: '',
    }
  }

  validateForm() {
    return this.state.email.length > 7 && this.state.password.length > 7
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.setState({ isLoading: true })
    try {
      await Auth.signIn(this.state.email, this.state.password)
      this.props.userHasAuthenticated(true)
      this.props.history.push('/')
    } catch (error) {
      alert(error.message)
      this.setState({ isLoading: false })
    }
  }

  handlePassword = event => {
    event.preventDefault()
    Auth.forgotPassword(this.state.email)
    .then(data => console.log(data))
    .catch(err => console.log(err));

// Collect confirmation code and new password, then
Auth.forgotPasswordSubmit(this.state.email, this.state.code, this.state.password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="signin">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <ButtonToolbar>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="primary"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Sign in"
            loadingText="Signing in"
          />
          <Button bsStyle="primary" bsSize="large" onClick={this.handlePassword}>
              Forgot password
            </Button>
            </ButtonToolbar>
        </form>
      </div>
    )
  }
}
