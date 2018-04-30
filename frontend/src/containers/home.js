import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { PageHeader, ListGroup, ListGroupItem, Button, Modal } from 'react-bootstrap'
import Lander from './lander'
import '../styles/home.css'

export default class Home extends Component {

  constructor(props, context) {
    super(props, context)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      isLoading: true,
      show: false,
      events: [],
      eventId: '',
      title: '',
      startDate: '',
      endDate: '',
      multiDay: '',
      startTime: '',
      endTime: '',
      contact: '',
      urlName: '',
      theLocation: '',
      description: ''
    }
  }

  async componentDidMount() {
    try {
      const allEvents = await this.events()
      console.log(allEvents)
      allEvents.sort(function(a,b) { 
        return new Date(a.startDate) - new Date(b.startDate) 
    })
      const today = new Date()
      let events = []
      for (let i = 0; i < allEvents.length; i++) {
        const eventDate = new Date(allEvents[i].startDate + ' 23:59')
        if (eventDate >= today ) events.push(allEvents[i])
      }
      this.setState({ events })
    } catch (error) {
      alert(error)
    }
    this.setState({ isLoading: false })
  }
  
  events() {
    return API.get("events", "/events")
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleShow() {
    this.setState({ show: true })
  }

  handleEventClick = event => {
    event.preventDefault()
    const currentEvent = event.currentTarget.getAttribute("data")
    this.handleGet(currentEvent)
    this.handleShow()
  }

  handleNewClick = event => {
    event.preventDefault()
    this.props.history.push(event.currentTarget.getAttribute("href"))
  }
  
  async handleGet(currentEvent) {
    this.setState({ isLoading: true })
  
    try {
      const event = await this.getEvent(currentEvent)
      this.setState({ ...event })
    } catch (e) {
      alert(e)
    }
    this.setState({ isLoading: false })
  }

  getEvent(currentEvent) {
    return API.get('events', `/events/${currentEvent}`)
  }

  renderEventsList(events) {
    return [{}].concat(events).map((event, i) =>
        (i !== 0)
          ?  <ListGroupItem
              key={event.eventId}
              data={event.eventId}
              onClick={this.handleEventClick}
              
              header={`${event.startDate}`}
        
            >{event.title}
            </ListGroupItem>
          :
            null
          // : <ListGroupItem
          //     key="new"
          //     href="/events/new"
          //     onClick={this.handleNewClick}
          //   >
          //     <h4>
          //       <b>{"\uFF0B"}</b> Create a new event
          //     </h4>
          //   </ListGroupItem>
    )
  }
  
  renderEvents() {
    return (
      <div>
        <PageHeader>Calendar of Events</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderEventsList(this.state.events)}
        </ListGroup>
      </div>
    )
  }

  renderModal() {
    const show = this.state.show
    return (
      <div>
        {
        show
        ? <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>The continuing education courses and workshops posted on this website do not reflect endorsement of the course content by the Pediatric Feeding Association.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="green-modal-title">{this.state.title}</p>
            <p>Starts: {this.state.startDate}</p>
            <p>{this.state.endDate}</p>
            <p>From: {this.state.startTime} To: {this.state.endTime}</p>
            <hr></hr>
            <div className="pre-wrap">
            {this.state.description}
            </div>
            <hr></hr>
            {this.state.contact}
            <p>{this.state.contact}</p>
            <p>{this.state.theLocation}</p>
            <p><a href={this.state.urlName}>{this.state.urlName}</a></p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        : null
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
        <Lander>
        </Lander>
        {this.renderEvents()}
        {this.renderModal()}
        
      </div>
      </div>
    )
  }
}
