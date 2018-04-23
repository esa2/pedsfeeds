import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { PageHeader, ListGroup, ListGroupItem } from 'react-bootstrap'
import '../styles/home.css'

export default class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      events: []
    }
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return
    }
  
    try {
      const events = await this.events()
      this.setState({ events })
    } catch (error) {
      alert(error)
    }
  
    this.setState({ isLoading: false })
  }
  
  events() {
    return API.get("events", "/events")
  }

  renderEventsList(events) {
    return [{}].concat(events).map(
      (event, i) =>
        i !== 0
          ? <ListGroupItem
              key={event.eventId}
              href={`/events/${event.eventId}`}
              onClick={this.handleEventClick}
              header={event.description.trim().split("\n")[0]}
            >
              {"Created: " + new Date(event.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/events/new"
              onClick={this.handleEventClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new event
              </h4>
            </ListGroupItem>
    )
  }
  
  handleEventClick = event => {
    event.preventDefault()
    this.props.history.push(event.currentTarget.getAttribute("href"))
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Home</h1>
        <p>Resources, support, experts for pediatric feeding and swallowing</p>
      </div>
    )
  }

  renderEvents() {
    return (
      <div className="events">
        <PageHeader>Your Events</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderEventsList(this.state.events)}
        </ListGroup>
      </div>
    )
  }

  render() {
    return (
      <div className="home">
        {this.props.isAuthenticated ? this.renderEvents() : this.renderLander()}
      </div>
    )
  }
}
