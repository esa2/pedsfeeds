import React, { Component } from 'react'
import { API } from 'aws-amplify'
import {
  ButtonToolbar,
  Button,
  FormGroup,
  ControlLabel,
  Radio,
  Well,
} from 'react-bootstrap'
import ProfileNew from './profile-new'
export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.handleCategory = this.handleCategory.bind(this)

    this.state = {
      isLoading: true,
      showCategories: false,
      listingCategory: '',
      showNewListing: false,
    }
  }

  async componentDidMount() {
    try {
      const profile = await this.profile()
      console.log('getting profile')
      console.log(profile)
    } catch (error) {
      alert(error)
    }
    this.setState({ isLoading: false })
  }

  profile() {
    return API.get('peds', '/profile')
  }

  handleNewClick = e => {
    e.preventDefault()
    this.setState({ showCategories: true })
  }

  handleCategory(e) {
    this.setState({ listingCategory: e.target.value, showNewListing: true })
  }

  renderCategories() {
    const showCategories = this.state.showCategories
    return (
      <div>
        {showCategories ? (
          <Well>
            <h6>Listing Category</h6>
            <FormGroup controlId="professionalDiscipline">
              <ControlLabel className="required">*</ControlLabel>
              <ControlLabel>Select one Category</ControlLabel>
              <Radio
                name="radioDiscipline"
                value="Counselor / Mental Health"
                required
                onChange={this.handleCategory}
              >
                Counselor / Mental Health Professionals
              </Radio>{' '}
              <Radio
                name="radioDiscipline"
                value="Dietitian"
                onChange={this.handleCategory}
              >
                Dietitians, Registered
              </Radio>{' '}
              <Radio
                name="radioDiscipline"
                value="Feeding Therapist"
                onChange={this.handleCategory}
              >
                Feeding Therapists (Occupational Therapists, Physical
                Therapists, Speech Language Pathologists)
              </Radio>{' '}
              <Radio
                name="radioDiscipline"
                value="Medical Care Provider"
                onChange={this.handleCategory}
              >
                Medical Care Providers
              </Radio>{' '}
            </FormGroup>
          </Well>
        ) : null}
      </div>
    )
  }

  render() {
    const showNewListing = this.state.showNewListing
    return (
      <div>
        <h4 className="header-green-center">
          Create, Edit or Delete your profile
        </h4>
        {this.props.isAuthenticated ? (
          <div>
            <ButtonToolbar>
              <Button
                bsStyle="primary"
                bsSize="large"
                onClick={this.handleNewClick}
              >
                Submit a new listing
              </Button>
              <Button bsStyle="primary" bsSize="large">
                Manage my listings
              </Button>
            </ButtonToolbar>
            {this.renderCategories()}{' '}
            {showNewListing ? (
              <ProfileNew value={this.state.listingCategory} />
            ) : null}
          </div>
        ) : (
          <p>You must be logged in to access your listings</p>
        )}
      </div>
    )
  }
}
