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
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      urlName: '',
      theLocation: '',
      description: ''
    }
  }

  validateForm() {
    return this.state.title.length > 0
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
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        theLocation: this.state.theLocation !== '' ? this.state.theLocation : null,
        description: this.state.description
      })
      this.props.history.push('/')
    } catch (error) {
      alert(error)
      this.setState({ isLoading: false })
    }
  }
  
  createEvent(event) {
    return API.post('events', '/events', {
      body: event
    })
  }

  render() {
    return (
      <div className="new-event">
        <form onSubmit={this.handleSubmit}>
        <FormGroup  className="field-size" controlId="title">
            {'Title'}
            <FormControl
              onChange={this.handleChange}
              value={this.state.title}
              placeholder="Title"
              componentClass="input"
            />
          </FormGroup>
          <FormGroup  className="field-size" controlId="startDate">
            <FormControl
              onChange={this.handleChange}
              value={this.state.startDate}
              placeholder="Start date"
              componentClass="input"
              type="date"
            />
          </FormGroup>
          <FormGroup  className="field-size" controlId="endDate">
            <FormControl
              onChange={this.handleChange}
              value={this.state.endDate}
              placeholder="End date"
              componentClass="input"
              type="date"
            />
          </FormGroup>
          <FormGroup  className="field-size" controlId="startTime">
            <FormControl
              onChange={this.handleChange}
              value={this.state.startTime}
              placeholder="Start time"
              componentClass="input"
              type="time"
            />
          </FormGroup>
          <FormGroup  className="field-size" controlId="endTime">
            <FormControl
              onChange={this.handleChange}
              value={this.state.endTime}
              placeholder="End time"
              componentClass="input"
              type="time"
            />
          </FormGroup>
          <FormGroup  className="field-size" controlId="theLocation">
            <FormControl
              onChange={this.handleChange}
              value={this.state.theLocation}
              placeholder="Location"
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
