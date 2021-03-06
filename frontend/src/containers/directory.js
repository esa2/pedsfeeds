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
import Map from './map'
import MapDetail from './map-detail'
import ProviderDetail from './provider-detail'

import '../styles/directory.css'

export default class Directory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      show: false,
      showProvider: false,
      showMap: true,
    }
  }

  handleCategoryClick = e => {
    e.preventDefault()
    let category = []

    this.state.allProfiles
    .filter(ele => ele.listingCategory === e.target.value)
    .map((ele) => category.push(ele))
    this.setState({ show: true, showProvider: false, showMap: false, category })
  }

  handleProviderClick = (e, currentProvider) => {
    e.preventDefault()
    this.setState({ showProvider: true, show: false,  showMap: false, currentProvider })
  }

  async componentDidMount() {
    try {
      const listings = await this.directory()
      const allProfiles = []

      listings.filter(ele => ele.approvedListing && ele.displayListing)
      .map((ele) => allProfiles.push(ele))

      allProfiles.sort((a, b) => a.lastName.localeCompare(b.lastName))

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

  renderMap() {
    const isLoading = this.state.isLoading
    const showMap = this.state.showMap
    return (!isLoading && showMap) ? (
      <div>
        <Map allProfiles={this.state.allProfiles}></Map>
      </div>
    ) : null
  }

  renderProviders() {
    const show = this.state.show
    return show ? (
      <div>
        <PageHeader></PageHeader>
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
                  <Media.Heading>{ele.listingTitle}</Media.Heading>
                  <p className="group">{ele.professionalDiscipline}</p>
                  <p className="group">
                    {ele.workCity}, {ele.workState}
                  </p>
                  <p className="group">{ele.workPhone} {ele.workExtension !== false ? `Ext-${ele.workExtension}` : null}
                  
                  </p>
                </Media.Body>
                <Media.Right>
                  {ele.attachment === null ? (
                    <img
                      width={70}
                      height={80}
                      src={`https://s3-us-west-2.amazonaws.com/pedsfeeds/images/profile/profile_noimg.jpg`}
                      alt="thumbnail"
                    />
                  ) : (
                    <img
                      width='auto'
                      height={80}
                      src={`https://s3-us-west-2.amazonaws.com/pedsfeeds/images/profile/${
                        ele.attachment
                      }`}
                      alt="thumbnail"
                    />
                  )}
                </Media.Right>
              </Media>
            </ListGroupItem>
            <br />
          </div>
        ) : null
    )
  }

  renderSelectedProvider(current) {
    const showProvider = this.state.showProvider
    return showProvider ? (
      <div>
        <ProviderDetail currentProvider={current} />
        <MapDetail currentProvider={current} />
      </div>
    ) : null
  }

  render() {
    return (
      <div>
        {this.renderButtons()}
        {this.renderMap()}
        {this.renderProviders()}
        {this.renderSelectedProvider(this.state.currentProvider)}
      </div>
    )
  }
}
