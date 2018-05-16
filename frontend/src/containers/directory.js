import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { ListGroup, ListGroupItem, PageHeader, ButtonToolbar, Button, Media } from 'react-bootstrap'
import '../styles/directory.css'

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

  handleProviderClick= e => {
    console.log('provider click')
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
      <div key={i}>
        <ListGroupItem onClick={this.handleProviderClick}>
          <Media>
            <Media.Body>
              <Media.Heading>{ele.lastName}, {ele.firstName}</Media.Heading>
              <p className="group">{ele.professionalDiscipline}</p>
              <p className="group">{ele.workCity}, {ele.workState}</p>
              <p className="group">{ele.workPhone}</p>
            </Media.Body>
            <Media.Right>
              <img width={70} height={80} src="https://s3-us-west-2.amazonaws.com/pedsfeeds/images/Bio/maria.png" alt="thumbnail" />
            </Media.Right>
          </Media>       
        </ListGroupItem>
        <br />

            {/* <ListGroupItem>
              <p>Ages Served:</p>
              {ele.agesServed.map((ele, i) =>
                <p key={i}>{ele}</p>
              )}
            </ListGroupItem>
            <br />

            <ListGroupItem>
              <h1>Practice Specialties:</h1>
              {ele.practiceSpecialties.map((ele, i) =>
                <p key={i}>{ele}</p>
              )}
            </ListGroupItem> */}
          </div>
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
