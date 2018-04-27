import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { FormGroup, FormControl } from 'react-bootstrap'
import LoaderButton from '../components/loader-button'

export default class Events extends Component {
  constructor(props) {
    super(props)

    this.file = null
    this.state = {
      isLoading: null,
      isDeleting: null,
      event: null,
      description: '',
      title: ''
    }
  }

  async componentDidMount() {
    try {
      const event = await this.getEvent()
      const { description, title } = event

      this.setState({
        event,
        description,
        title
      })
    } catch (e) {
      alert(e)
    }
  }

  getEvent() {
    return API.get('events', `/events/${this.props.match.params.id}`)
  }

  validateForm() {
    return this.state.description.length > 0
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  
  saveEvent(event) {
    return API.put('events', `/events/${this.props.match.params.id}`, {
      body: event
    })
  }
  
  handleSubmit = async event => {
    event.preventDefault()
  
    this.setState({ isLoading: true })
  
    try {
  
      await this.saveEvent({
        description: this.state.description,
        title: this.state.title
      })
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isLoading: false })
    }
  }
  
  deleteEvent() {
    return API.del('events', `/events/${this.props.match.params.id}`)
  }
  
  handleDelete = async event => {
    event.preventDefault()
  
    const confirmed = window.confirm(
      'Are you sure you want to delete this event?'
    )
  
    if (!confirmed) {
      return
    }
  
    this.setState({ isDeleting: true })
  
    try {
      await this.deleteEvent()
      this.props.history.push('/')
    } catch (e) {
      alert(e)
      this.setState({ isDeleting: false })
    }
  }
  
  render() {
    return (
      <div>
        {this.state.event &&
          <form onSubmit={this.handleSubmit}>
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
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    )
  }
}
