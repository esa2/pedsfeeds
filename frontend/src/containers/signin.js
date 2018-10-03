import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button, HelpBlock } from 'react-bootstrap'
import LoaderButton from '../components/loader-button'
import '../styles/signin.css'

export default class Signin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      forgotPassword: false,
      confirmationCode: '',
      successfullReset: false,
    }
  }

  validateForm() {
    return this.state.email.length > 7 && this.state.password.length > 7
  }

  validateFormForgot() {
    return this.state.email.length > 7
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0 &&
    this.state.password.length > 7 &&
    this.state.password === this.state.confirmPassword
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleSubmit = async e => {
    e.preventDefault()

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

  handleConfirmationSubmit = async e => {
    e.preventDefault()

    this.setState({ isLoading: true })
    try {
      await Auth.forgotPasswordSubmit(this.state.email, this.state.confirmationCode, this.state.password)
    } catch (error) {
      alert(error.message)
      this.setState({ isLoading: false })
    }
    this.setState({ successfullReset: true, forgotPassword: false, isLoading: false })
  }

  handlePasswordReset = async e => {
    e.preventDefault()
    try {
      await Auth.forgotPassword(this.state.email)
    } catch (error) {
      alert(error.message)
    }
      this.setState({ forgotPassword: true })
  }

  renderConfirmationForm() {
    return (
      <div className="signin">
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>
            Enter new password: Min length of 8, must contain at least
            one lowercase, uppercase, numeric and symbol
          </ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm new password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          bsStyle="primary"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
      </div>
    )
  }

  renderForm() {
    const successfullReset = this.state.successfullReset
    return (
      <div className="signin">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            {successfullReset ?
            <HelpBlock className="success-message">Your password was successfully reset</HelpBlock> : null}
            <hr></hr>
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
          <ButtonToolbar className="center-buttons">
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
          </ButtonToolbar>
          <ButtonToolbar className="center-buttons">
          <Button bsStyle="primary" bsSize="large"  disabled={!this.validateFormForgot()} onClick={this.handlePasswordReset}>
              Forgot password
            </Button>
            </ButtonToolbar>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.forgotPassword === false
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    )
  }
}
