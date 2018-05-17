import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { ButtonToolbar, Button, FormGroup, ControlLabel, Radio, Well } from 'react-bootstrap'
import ProfileNew from './profile-new'
export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.handleCategory = this.handleCategory.bind(this)

    this.state = {
      isLoading: true,
      showCategories: false,
      counselor: false,
      dietician: false,
      feeding: false,
      medical: false,
      showNewListing: false
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
    return API.get("peds", "/profile")
  }

  handleNewClick = e => {
    e.preventDefault()
    this.setState({ showCategories: true })
  }

  handleCategory(e) {
    switch(e.target.value) {
      case 'Counselor / Mental Health':
        this.setState({ counselor: true })
      break
      case 'Dietitian':
        this.setState({ dietician: true })
      break
      case 'Feeding Therapist':
        this.setState({ feeding: true, showNewListing: true })
      break
        case 'Medical Care Provider':
        this.setState({ medical: true })
      break
    }
  }

  renderCategories() {
  const showCategories = this.state.showCategories
    return (
      <div>
        {
        showCategories
        ?
        <Well>
          <h6>Listing Category</h6>
          <FormGroup controlId="professionalDiscipline">
            <ControlLabel className="required">*</ControlLabel>
            <ControlLabel>Select one Category</ControlLabel>
            <Radio
              name="radioDiscipline"
              value="Counselor / Mental Health"
              required
              onChange={this.handleCategory}>
              Counselor / Mental Health Professionals
            </Radio>{' '}
            <Radio name="radioDiscipline"
              value="Dietitian"
              onChange={this.handleCategory}>
              Dietitians, Registered
            </Radio>{' '}
            <Radio name="radioDiscipline"
              value="Feeding Therapist"
              onChange={this.handleCategory}>
              Feeding Therapists (Occupational Therapists, Physical Therapists, Speech Language Pathologists)
            </Radio>{' '}
            <Radio name="radioDiscipline"
              value="Medical Care Provider"
              onChange={this.handleCategory}>
              Medical Care Providers
            </Radio>{' '}
          </FormGroup>
        </Well>
        :
        null
      }
      </div>
    )
  }

  render() {
    const showNewListing = this.state.showNewListing
    return (
      <div>
        <h4 className="header-green-center">Create, Edit or Delete your profile</h4>
        {this.props.isAuthenticated
         ? (
          <div>
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="large" onClick={this.handleNewClick}>
              Submit a new listing
            </Button>
            <Button bsStyle="primary" bsSize="large">
              Manage my listings
            </Button>
          </ButtonToolbar>
          {this.renderCategories()} {
            showNewListing
            ?
            <ProfileNew></ProfileNew>
            :
            null}
          </div>
          ) : (
            <p>You must be logged in to access your listings</p>
          )}
      </div>
    )
  }
}
