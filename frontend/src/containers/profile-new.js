import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Radio } from 'react-bootstrap'
import LoaderButton from '../components/loader-button'
import '../styles/profile-new.css'

export default class ProfileNew extends Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleRadioChangeYes = this.handleRadioChangeYes.bind(this)
    this.handleRadioChangeNo = this.handleRadioChangeNo.bind(this)

    this.state = {
      isLoading: null,
      lastName: '',
      firstName: '',
      middleInitial: '',
      displayListing: false,
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value })
    console.log('state')
    console.log(this.state)
  }

  handleRadioChangeYes() {
    this.setState({ display: true })
  }

  handleRadioChangeNo() {
    this.setState({ display: false })
  }

  render() {
    return (
        <form>

        <FormGroup controlId="lastName">
          <ControlLabel className="required">*</ControlLabel>
          <ControlLabel>Last Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.lastName}
            placeholder="Enter last name"
            required
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="firstName">
          <ControlLabel className="required">*</ControlLabel>
          <ControlLabel>First Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.firstName}
            placeholder="Enter first name"
            required
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="middleInitial">
          <ControlLabel>Middle Initial</ControlLabel>
          <FormControl
            type="text"
            value={this.state.middleInitial}
            placeholder="Enter middle initial"
            maxLength = "1"
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="professionalDiscipline">
          <ControlLabel>Professional Discipline</ControlLabel>
          <FormControl
            type="text"
            value={this.state.professionalDiscipline}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="displayListing">
          <ControlLabel className="required">*</ControlLabel>
          <ControlLabel>Display your profile in the Provider Directory?</ControlLabel>
          <Radio name="radioGroup" onChange={this.handleRadioChangeYes}>
            Yes
          </Radio>{' '}
          <Radio name="radioGroup" onChange={this.handleRadioChangeNo}>
            No
          </Radio>{' '}
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Licensure</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Place of Employment</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Work Contact Information</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Provider Group</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Work Setting</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Specialty</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Certifications</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Professional Experience Treating Pediatric Feeding</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Experience Treating Patients with the Following Issues or Conditions</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Specific Education / Training on Pediatric Feeding</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Research / Publication / Presentations on Pediatric Feeding</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Ages Served</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Payment Types Accepted</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Mental Health / Counseling Services</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Experience in Treating Children with These Medical Conditions</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Feeding Clinical Practice Specialities</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Years of Experience Related to Pediatric Feeding</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <FormGroup controlId="">
          <ControlLabel>Agreements</ControlLabel>
          <FormControl
            type="text"
            value={this.state.x}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
    )
  }
}
