import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import LoaderButton from '../components/loader-button'
import '../styles/signup.css'

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    }
  }

  validateForm() {
    return (
      this.state.email.length > 7 &&
      this.state.password.length > 7 &&
      this.state.password === this.state.confirmPassword
    )
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
  
    this.setState({ isLoading: true })
  
    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      })
      this.setState({
        newUser
      })
    } catch (error) {
      console.log(error)
      if (error.code === 'UsernameExistsException') {
        try {
          const resendVerification = await Auth.resendSignUp(this.state.email)
          this.setState({
            newUser: resendVerification
          })
        } catch (error) {
      alert('There is already an account with this user name')
      }
    }
  }
  
    this.setState({ isLoading: false })
  }
  
  handleConfirmationSubmit = async event => {
    event.preventDefault()
  
    this.setState({ isLoading: true })

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode)
      await Auth.signIn(this.state.email, this.state.password)
  
      this.props.userHasAuthenticated(true)
      this.props.history.push('/profile')
    } catch (error) {
      alert(error.message)
      this.setState({ isLoading: false })
    }
  }

  renderConfirmationForm() {
    return (
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
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    )
  }

  renderForm() {
    return (
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
          <ControlLabel>Password - requires minimum length of 8 and must contain at least one lowercase, uppercase, numeric and symbol</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
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
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    )
  }

  render() {
    return (
      <div className="signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    )
  }
}
