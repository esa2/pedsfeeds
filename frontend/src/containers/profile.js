import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { ButtonToolbar, Button, FormGroup, ControlLabel, Radio, Well } from 'react-bootstrap'
export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
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

  handleNewClick = event => {
    event.preventDefault()
    this.props.history.push(event.currentTarget.getAttribute("href"))
  }

  render() {
    return (
      <div>
        <h4 className="header-green-center">Create, Edit or Delete your profile</h4>
        {this.props.isAuthenticated && !this.state.isLoading ? (
          <div>
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="large" onClick={this.handleNewClick}href="/profile-new">
              Submit a new listing
            </Button>
            <Button bsStyle="primary" bsSize="large">
              Manage my listings
            </Button>
          </ButtonToolbar>

          <Well>
          <h6>Listing Category</h6>
          <FormGroup controlId="professionalDiscipline">
            <ControlLabel className="required">*</ControlLabel>
            <ControlLabel>Select one Category</ControlLabel>
            <Radio
              name="radioDiscipline"
              value="Occupational Therapist"
              required
              onChange={this.handleDiscipline}>
              Counselor / Mental Health Professionals
            </Radio>{' '}
            <Radio name="radioDiscipline"
              value="Behavioral / Clinical Child Psychologist"
              onChange={this.handleDiscipline}>
              Dietitians, Registered
            </Radio>{' '}
            <Radio name="radioDiscipline"
              value="Physical Therapist"
              onChange={this.handleDiscipline}>
              Feeding Therapists (Occupational Therapists, Physical Therapists, Speech Language Pathologists)
            </Radio>{' '}
            <Radio name="radioDiscipline"
              value="Speech Language Pathologist"
              onChange={this.handleDiscipline}>
              Medical Care Providers
            </Radio>{' '}
          </FormGroup>
        </Well>
          </div>
          ) : (
            <p>You must be logged in to access your profile</p>
          )}
      </div>
    )
  }
}
