import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Radio, Checkbox } from 'react-bootstrap'
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
        <h6>Name</h6>
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
            placeholder=""
            required
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="middleInitial">
          <ControlLabel>Middle Initial</ControlLabel>
          <FormControl
            type="text"
            value={this.state.middleInitial}
            placeholder=""
            maxLength = "1"
            onChange={this.handleChange}
          />
        </FormGroup>
        <hr />
        <h6>Licensure</h6>
        <FormGroup controlId="licenseState">
          <ControlLabel></ControlLabel>
          <ControlLabel className="required">*</ControlLabel>
          <ControlLabel>State</ControlLabel>
          <FormControl componentClass="select">
            <option value="AK">AK</option>
            <option value="AL">AL</option>
            <option value="AR">AR</option>
            <option value="AZ">AZ</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DC">DC</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="IA">IA</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="MA">MA</option>
            <option value="MD">MD</option>
            <option value="ME">ME</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MO">MO</option>
            <option value="MS">MS</option>
            <option value="MT">MT</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="NE">NE</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NV">NV</option>
            <option value="NY">NY</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VA">VA</option>
            <option value="VT">VT</option>
            <option value="WA">WA</option>
            <option value="WI">WI</option>
            <option value="WV">WV</option>
      </FormControl>
        </FormGroup>
        <FormGroup controlId="licenseNumber">
        <ControlLabel className="required">*</ControlLabel>
          <ControlLabel>State License Number</ControlLabel>
          <FormControl
            type="text"
            value={this.state.licenseNumber}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>
        <Checkbox readOnly>
          I am in good standing with the state and national liscensing or certification bodies required for my profession
        </Checkbox>
        <FormGroup controlId="taxId">
          <ControlLabel>Tax ID</ControlLabel>
          <FormControl
            type="text"
            value={this.state.taxId}
            placeholder=""
            onChange={this.handleChange}
          />
        </FormGroup>

        <hr />
        <h6></h6>
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
