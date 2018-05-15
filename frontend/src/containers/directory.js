import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { ListGroup, ListGroupItem, PageHeader, ButtonToolbar, Button } from 'react-bootstrap'

export default class Directory extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      show: false,
      Occupational: false,
      Behavioral: false,
      Physical: false,
      Speech: false,
    }
  }

  handleClick = e => {
    e.preventDefault()
    let discipline = []
    this.state.allProfiles.map(ele => {
      if (ele.professionalDiscipline
        === e.target.value) discipline.push(ele)
    })
    this.setState({ show: true, discipline })
    console.log(this.state.allProfiles)
  }

  async componentDidMount() {
    try {
      const allProfiles = await this.directory()
      this.setState({ allProfiles })
    } catch (error) {
      alert(error)
    }
    this.setState({ isLoading: false })
  }
  
  directory() {
    return API.get("peds", "/all-profiles")
  }

  renderButtons() {
    return (
      <div>
        <h4 className="header-green-center">Provider Directory</h4>
        <p>Excuse our dust.</p>
        <p>
          The Provider Directory is temporarily offline while the site is being upgraded.
        </p>
        <p>Check back soon.</p>
        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="large" onClick={this.handleClick} value="Speech Language Pathologist">
            Medical Care Providers
          </Button>
          <Button bsStyle="primary" bsSize="large" onClick={this.handleClick} value="Occupational Therapist">
            Feeding Therapists, OT/PT, SLP
          </Button>
          <Button bsStyle="primary" bsSize="large">
            Counselor / Mental Health Professionals
          </Button>
          <Button bsStyle="primary" bsSize="large">
            Dieticians, Registered
          </Button>
        </ButtonToolbar>
      </div>
    )
  }

  renderProviders() {
    const show = this.state.show
    return (
      show ?
      <div>
        <PageHeader>Providers</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderProviderList(this.state.discipline)}
        </ListGroup>
      </div>
      :
      null
    )
  }

  renderProviderList(discipline) {
      return [{}].concat(discipline).map((ele, i) =>
        (i !== 0)
          ?
          <ListGroupItem
              key={i}
              header={`${ele.lastName}, ${ele.firstName}`}
            >
            Ages Served: {ele.agesServed}
            </ListGroupItem>
        :
        null 
    )
  }

  render() {
    return (
      <div>
        {this.renderButtons()}
        {this.renderProviders()}
      </div>
    )
  }
}
