import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import LoaderButton from '../components/loader-button'
import '../styles/contact.css'

export default class Contact extends Component {
  constructor(props) {
    super(props)

    this.file = null
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  }

  validateForm() {
    return (
      this.state.name.length &&
      this.state.email.length &&
      this.state.subject.length &&
      this.state.message.length > 0
    )
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render() {
    return (
      <div className="contact">
        <h4 className="header-green-center">Contact Us</h4>
        <p className="required">*Required field</p>
        <form
          action="https://formspree.io/esabrahamsen@yahoo.com"
          method="POST"
        >
          <FormGroup className="field-size" controlId="name">
            <ControlLabel>Name *</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Enter name"
              componentClass="input"
              type="name"
              name="name"
            />
          </FormGroup>
          <FormGroup className="field-size" controlId="email">
            <ControlLabel>Email address *</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.email}
              placeholder="Enter email"
              componentClass="input"
              type="email"
              name="email"
            />
          </FormGroup>
          <FormGroup className="field-size" controlId="subject">
            <ControlLabel>Subject *</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.subject}
              placeholder="Enter subject"
              componentClass="input"
              type="subject"
              name="subject"
            />
          </FormGroup>
          <ControlLabel>Message *</ControlLabel>
          <FormGroup controlId="message">
            <FormControl
              onChange={this.handleChange}
              value={this.state.message}
              componentClass="textarea"
              name="textarea"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            value="Send"
            isLoading={this.state.isLoading}
            text="Send Email"
            loadingText="Creating…"
          />
        </form>
      </div>
    )
  }
}
