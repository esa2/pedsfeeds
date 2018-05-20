import React, { Component } from 'react'
import { API } from 'aws-amplify'
import {
  ListGroup,
  ListGroupItem,
  PageHeader,
  ButtonToolbar,
  Button,
  Media,
} from 'react-bootstrap'
import ProviderDetail from './provider-detail'

import '../styles/directory.css'

export default class Directory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      show: false,
      showProvider: false,
    }
  }

  handleCategoryClick = e => {
    e.preventDefault()
    let category = []

    // this.state.allProfiles
    // .filter(listingCategory => listingCategory === e.target.value)
    // .map((listingCategory) => category.push(listingCategory))
    this.state.allProfiles.map(ele => {
      if (ele.listingCategory === e.target.value) category.push(ele)
    })
    this.setState({ show: true, showProvider: false, category })
    console.log(this.state.allProfiles)
  }

  handleProviderClick = (e, currentProvider) => {
    e.preventDefault()
    this.setState({ showProvider: true, show: false, currentProvider })
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
    return API.get('peds', '/all-profiles')
  }

  renderButtons() {
    return (
      <div>
        <h4 className="header-green-center">Provider Directory</h4>
        <p>Excuse our dust.</p>
        <p>
          The Provider Directory is temporarily offline while the site is being
          upgraded.
        </p>
        <p>Check back soon.</p>
        <ButtonToolbar>
          <Button
            bsStyle="primary"
            onClick={this.handleCategoryClick}
            value="Counselor / Mental Health"
          >
            Counselor / Mental Health Professionals
          </Button>
          <Button
            bsStyle="primary"
            onClick={this.handleCategoryClick}
            value="Dietitian"
          >
            Dieticians, Registered
          </Button>
          <Button
            bsStyle="primary"
            onClick={this.handleCategoryClick}
            value="Feeding Therapist"
          >
            Feeding Therapists, OT/PT, SLP
          </Button>
          <Button
            bsStyle="primary"
            onClick={this.handleCategoryClick}
            value="Medical Care Provider"
          >
            Medical Care Providers
          </Button>
        </ButtonToolbar>
      </div>
    )
  }

  renderProviders() {
    const show = this.state.show
    return show ? (
      <div>
        <PageHeader>Providers</PageHeader>
        <ListGroup>
          {!this.state.isLoading &&
            this.renderProviderList(this.state.category)}
        </ListGroup>
      </div>
    ) : null
  }

  renderProviderList(category) {
    return [{}].concat(category).map(
      (ele, i) =>
        i !== 0 ? (
          <div key={i}>
            <ListGroupItem onClick={e => this.handleProviderClick(e, ele)}>
              <Media>
                <Media.Body>
                  <Media.Heading>
                    {ele.listingTitle}
                  </Media.Heading>
                  <p className="group">{ele.professionalDiscipline}</p>
                  <p className="group">
                    {ele.workCity}, {ele.workState}
                  </p>
                  <p className="group">{ele.workPhone}</p>
                </Media.Body>
                <Media.Right>
                <img
                width={70}
                height={70}
                src={`https://s3-us-west-2.amazonaws.com/peds-app-uploads/private/us-west-2%3A51121127-1978-4b7e-a501-13ec365c23f2/${ele.attachment}`}
                alt="thumbnail"
              />
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
        ) : null
    )
  }

  renderSelectedProvider(current) {
    const showProvider = this.state.showProvider
    return showProvider ? (
      <div>
        <ProviderDetail value={current} />
      </div>
    ) : null
  }

  render() {
    return (
      <div>
        {this.renderButtons()}
        {this.renderProviders()}
        {this.renderSelectedProvider(this.state.currentProvider)}
      </div>
    )
  }
}
