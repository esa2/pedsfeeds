import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { FormGroup, FormControl } from 'react-bootstrap'
import LoaderButton from '../components/loader-button'
import '../styles/new-event.css'

export default class NewEvent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: null,
      title: '',
      description: ''
    }
  }

  validateForm() {
    return this.state.title.length > 0
    return this.state.description.length > 0
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
      await this.createEvent({
        title: this.state.title,
        description: this.state.description
      })
      this.props.history.push('/')
    } catch (error) {
      alert(error)
      this.setState({ isLoading: false })
    }
  }
  
  createEvent(event) {
    return API.post("peds", "/peds", {
      body: event
    })
  }

  render() {
    return (
      <div className="new-event">
        <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="title">
            <FormControl
              onChange={this.handleChange}
              value={this.state.title}
              componentClass="input"
            />
          </FormGroup>
          <FormGroup controlId="description">
            <FormControl
              onChange={this.handleChange}
              value={this.state.description}
              componentClass="textarea"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    )
  }
}
