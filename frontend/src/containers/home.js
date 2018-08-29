import React, { Component } from 'react'
import { API } from 'aws-amplify'
import {
  PageHeader,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
} from 'react-bootstrap'
import Lander from './lander'
import '../styles/home.css'

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.handleClose = this.handleClose.bind(this)

    this.state = {
      isLoading: true,
      show: false,
    }
  }

  async componentDidMount() {
    try {
      const calendarEntries = await this.calendar()
      calendarEntries.sort(function(a, b) {
        return new Date(a.startDate) - new Date(b.startDate)
      })
      const today = new Date()
      let entries = []
      for (let i = 0; i < calendarEntries.length; i++) {
        const entryDate = new Date(calendarEntries[i].startDate + ' 23:59')
        if (entryDate >= today) entries.push(calendarEntries[i])
      }
      this.setState({ entries })
    } catch (error) {
      alert(error)
    }
    this.setState({ isLoading: false })
  }

  calendar() {
    return API.get('peds', '/calendar')
  }

  handleClose() {
    this.setState({ show: false })
  }

  handleCalendarClick = event => {
    event.preventDefault()
    const currentEntry = event.currentTarget.getAttribute('data')
    this.handleGet(currentEntry)
    this.setState({ show: true })
  }

  handleNewClick = event => {
    event.preventDefault()
    this.props.history.push(event.currentTarget.getAttribute('href'))
  }

  async handleGet(currentEntry) {
    this.setState({ isLoading: true })

    try {
      const entry = await this.getCalendar(currentEntry)
      this.setState({ ...entry })
    } catch (e) {
      alert(e)
    }
    this.setState({ isLoading: false })
  }

  getCalendar(currentEntry) {
    return API.get('peds', `/calendar/${currentEntry}`)
  }

  renderCalendarList(entries) {
    return [{}].concat(entries).map(
      (entry, i) =>
        i !== 0 ? (
          <ListGroupItem
            key={entry.eventId}
            data={entry.eventId}
            onClick={this.handleCalendarClick}
            header={`${entry.title}`}
          >
            {entry.startDate}
            <br />
            {entry.theLocation}
          </ListGroupItem>
        ) : null
        // ) : <ListGroupItem
        //   key="new"
        //   href="/calendar/new"
        //   onClick={this.handleNewClick}
        // >
        //   <h4>
        //     <b>{"\uFF0B"}</b> Create a new event
        //   </h4>
        // </ListGroupItem>
    )
  }

  renderCalendar() {
    return (
      <div>
        <PageHeader>Calendar of Events</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderCalendarList(this.state.entries)}
        </ListGroup>
      </div>
    )
  }

  renderModal() {
    const show = this.state.show
    return (
      <div>
        {show ? (
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                The continuing education courses and workshops posted on this
                website do not reflect endorsement of the course content by the
                Pediatric Feeding Association.
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p className="green-modal-title">{this.state.title}</p>
              <p>Starts: {this.state.startDate}</p>
              <p>{this.state.endDate}</p>
              <p>
                {/* From: {this.state.startTime} */}
                {this.state.startTime === null ? null : ` From: ${this.state.startTime}`}
                {this.state.endTime === null ? null : ` To: ${this.state.endTime}`}
              </p>
              <hr />
              <div className="pre-wrap">{this.state.description}</div>
              <hr />
              {this.state.contact}
              <p>{this.state.contact}</p>
              <p>Location: {this.state.theLocation}</p>
              <p>
                <a href={this.state.urlName}>{this.state.urlName}</a>
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        ) : null}
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
          <Lander />
          {this.renderCalendar()}
          {this.renderModal()}
        </div>
      </div>
    )
  }
}
