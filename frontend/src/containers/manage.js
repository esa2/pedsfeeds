import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { s3Upload } from '../lib/aws-lib'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Radio,
  Checkbox,
  ButtonToolbar,
  Button,
  Well,
} from 'react-bootstrap'
import LoaderButton from '../components/loader-button'
import Config from '../amplify-config'

export default class Manage extends Component {
  constructor(props) {
    super(props)

    this.file = null
    this.handleChange = this.handleChange.bind(this)
    this.handleListingDisplay = this.handleListingDisplay.bind(this)
    this.handleDiscipline = this.handleDiscipline.bind(this)
    this.handleExperience = this.handleExperience.bind(this)
    this.handleEdit = this.handleEdit.bind(this)

    this.state = {
      isLoading: false,
      isGetting: true,
      userHasListing: null,
      updatedListing: false,
      deletedListing: false,
      listings: [],
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleListingDisplay() {
    this.setState({ displayListing: !this.state.displayListing })
  }

  handleDiscipline(e) {
    this.setState({ professionalDiscipline: e.target.value })
  }

  handleExperience(e) {
    this.setState({ yearsExperience: e.target.value })
  }

  handleLicenseChange = () => {
    this.setState({ licenseStanding: !this.state.licenseStanding })
  }

  handleTocChange = () => {
    this.setState({ toc: !this.state.toc })
  }

  handleMultipleChange = (e, stateName) => {
    let updateState = this.state[stateName]
    if (e.target.checked) {
      updateState.push(e.target.value)
      this.setState({ [stateName]: updateState })
    } else {
      const index = updateState.indexOf(e.target.value)
      if (~index) updateState.splice(index, 1)
    }
  }

  handleFileChange = e => {
    this.file = e.target.files[0]
  }

  fetchAddress = async (street, city, state) => {
    var fetchStreet = street.replace(/ /gi, '+')
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${fetchStreet},+${city},+${state}&key=API_KEY`
    )
    return response.json()
  }

  handleSubmit = async e => {
    e.preventDefault()

    if (this.file && this.file.size > Config.MAX_ATTACHMENT_SIZE) {
      alert('Your image file must be smaller than 1MB')
      return
    }

    this.setState({ isLoading: true })

    try {
      const address = await this.fetchAddress(
        this.state.workAddress1,
        this.state.workCity,
        this.state.workState
      )
      this.setState({
        lat: address.results[0].geometry.location.lat,
        lng: address.results[0].geometry.location.lng,
      })
    } catch (error) {
      alert(error)
    }

    try {
      const attachment = this.file ? await s3Upload(this.file) : null

      await this.updateProfile({
        attachment,
        approvedListing: this.state.approvedListing,
        listingCategory: this.state.listingCategory,
        listingTitle: this.state.listingTitle,
        lastName: this.state.lastName,
        firstName: this.state.firstName,
        displayListing: this.state.displayListing,
        professionalDiscipline: this.state.professionalDiscipline,
        licenseState: this.state.licenseState,
        licenseStanding: this.state.licenseStanding,
        licenseNumber: this.state.licenseNumber,
        empOrganization: this.state.empOrganization,
        empUrl: this.state.empUrl !== '' ? this.state.empUrl : false,
        workAddress1: this.state.workAddress1,
        workAddress2:
          this.state.workAddress2 !== '' ? this.state.workAddress2 : false,
        workCity: this.state.workCity,
        workState: this.state.workState,
        workZip: this.state.workZip,
        workPhone: this.state.workPhone,
        workExtension:
          this.state.workExtension !== '' ? this.state.workExtension : false,
        workEmail: this.state.workEmail !== '' ? this.state.workEmail : false,
        providerGroup:
          this.state.providerGroup !== '' ? this.state.providerGroup : false,
        providerGroupText:
          this.state.providerGroupText !== ''
            ? this.state.providerGroupText
            : false,
        workSetting: this.state.workSetting,
        agesServed: this.state.agesServed,
        paymentTypes: this.state.paymentTypes,
        medicalConditions: this.state.medicalConditions,
        feedingConditions: this.state.feedingConditions,
        practiceSpecialties: this.state.practiceSpecialties,
        certifications: this.state.certifications,
        mentalHealth: this.state.mentalHealth,
        medicalSpecialty: this.state.medicalSpecialty,
        medicalExperienceTreating: this.state.medicalExperienceTreating,
        medicalEducation1:
          this.state.medicalEducation1 !== ''
            ? this.state.medicalEducation1
            : false,
        medicalEducation2:
          this.state.medicalEducation2 !== ''
            ? this.state.medicalEducation2
            : false,
        medicalEducation3:
          this.state.medicalEducation3 !== ''
            ? this.state.medicalEducation3
            : false,
        medicalResearch1:
          this.state.medicalResearch1 !== ''
            ? this.state.medicalResearch1
            : false,
        medicalResearch2:
          this.state.medicalResearch2 !== ''
            ? this.state.medicalResearch2
            : false,
        medicalResearch3:
          this.state.medicalResearch3 !== ''
            ? this.state.medicalResearch3
            : false,
        yearsExperience:
          this.state.yearsExperience !== ''
            ? this.state.yearsExperience
            : false,
        toc: this.state.toc,
        lat: this.state.lat,
        lng: this.state.lng,
      })
    } catch (error) {
      alert(error)
    }
    this.setState({ isLoading: false, updatedListing: true })
  }

  updateProfile(profile) {
    return API.put('peds', `/manage/${this.state.uuId}`, {
      body: profile,
    })
  }

  handleDelete = async e => {
    e.preventDefault()

    const confirmed = window.confirm(
      'Are you sure you want to delete this listing?'
    )
    if (!confirmed) {
      return
    }

    try {
      await this.deleteListing(e.target.value)
    } catch (e) {
      alert(e)
    }
    this.setState({ deletedListing: true })
  }

  deleteListing(uuId) {
    return API.del('peds', `/delete/${uuId}`)
  }

  async componentDidMount() {
    try {
      const allProfiles = await this.profile()
      if (allProfiles.length > 0)
        this.setState({
          listings: allProfiles,
          userHasListing: true,
          approvedListing: false,
        })
    } catch (error) {
      alert(error)
    }
    this.setState({ isGetting: false })
    if (!this.state.userHasListing) this.setState({ userHasListing: false })
  }

  profile() {
    return API.get('peds', '/manage')
  }

  checkRequired(e) {
    e.preventDefault()
    if (this.state.workSetting.length === 0) {
      const requiredCheckbox = document.getElementById('workSettingReq')
      requiredCheckbox.scrollIntoView()
      return
    }
    if (this.state.listingCategory === 'Medical Care Provider') {
      if (this.state.medicalSpecialty.length === 0) {
        const requiredCheckbox = document.getElementById('medicalSpecialtyReq')
        requiredCheckbox.scrollIntoView()
        return
      }
    }
    if (
      this.state.listingCategory === 'Counselor / Mental Health' ||
      this.state.listingCategory === 'Medical Care Provider'
    ) {
      if (this.state.certifications.length === 0) {
        const requiredCheckbox = document.getElementById('certificationsReq')
        requiredCheckbox.scrollIntoView()
        return
      }
    }
    if (this.state.listingCategory !== 'Medical Care Provider') {
      if (this.state.agesServed.length === 0) {
        const requiredCheckbox = document.getElementById('agesServedReq')
        requiredCheckbox.scrollIntoView()
        return
      }
    }
    if (this.state.listingCategory !== 'Medical Care Provider') {
      if (this.state.paymentTypes.length === 0) {
        const requiredCheckbox = document.getElementById('paymentTypesReq')
        requiredCheckbox.scrollIntoView()
        return
      }
    }
    this.handleSubmit(e)
  }

  handleEdit(e) {
    this.setState({ ...this.state.listings[e.target.value], listingChosen: true })
  }

  renderListingLinks() {
    const userHasListing = this.state.userHasListing
    const isGetting = this.state.isGetting
    const listingChosen = this.state.listingChosen
    const deletedListing = this.state.deletedListing
    return (
      <div>
        {userHasListing && !listingChosen && !deletedListing ?  (
          <div>
            <p className="detail-heading">LISTING TITLE</p>
            {this.state.listings.map((ele, i) => (
              <div key={ele.uuId}>
                <li key={ele.uuId}>{ele.listingTitle}</li>
                <ButtonToolbar>
                  <Button
                    value={i}
                    bsStyle="primary"
                    onClick={this.handleEdit}
                  >
                    Edit listing
                  </Button>
                  <Button
                    value={ele.uuId}
                    bsStyle="primary"
                    onClick={this.handleDelete}
                  >
                    Delete listing
                  </Button>
                </ButtonToolbar>
                <hr />
              </div>
            ))}
          </div>
        ) : null}
        {!isGetting && !userHasListing ? (
          <p>No listings were found. If this is an error please contact us.</p>
        ) : null}

        {deletedListing ? (
          <p className="success-message">
          Your listing was successfully deleted
        </p>
        ) : null}
      </div>
    )
  }

  render() {
    const listingChosen = this.state.listingChosen
    const updatedListing = this.state.updatedListing
    return (
      <div>
        <h4 className="header-green-center">Edit or Delete your listing</h4>
        {this.renderListingLinks()}
        {listingChosen ? (
          <div>
            <h6 className="header-green-center">
              {this.state.listingTitle} listing
            </h6>
              <div>
                <p>
                  Required fields<span className="required">*</span>
                </p>

                <Form onSubmit={e => this.checkRequired(e)}>
                  <Well>
                    <h6>Listing Title</h6>
                    <FormGroup controlId="listingTitle">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>
                        Your name and post-nominal initials
                      </ControlLabel>
                      <FormControl
                        autoFocus
                        type="text"
                        defaultValue={this.state.listingTitle}
                        required
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Well>
                  <Well>
                    <h6>Name</h6>
                    <FormGroup controlId="lastName">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>Last Name</ControlLabel>
                      <FormControl
                        type="text"
                        defaultValue={this.state.lastName}
                        required
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="firstName">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>First Name</ControlLabel>
                      <FormControl
                        type="text"
                        defaultValue={this.state.firstName}
                        required
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Well>
                  <Well>
                    <h6>Display your profile in the Provider Directory?</h6>
                    <FormGroup controlId="displayListing">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>Select one</ControlLabel>
                      <Radio
                        defaultChecked={
                          this.state.displayListing === false ? true : false
                        }
                        name="radioDisplay"
                        onChange={this.handleListingDisplay}
                      >
                        No thanks please keep it private
                      </Radio>
                      <Radio
                        defaultChecked={
                          this.state.displayListing === true ? true : false
                        }
                        name="radioDisplay"
                        onChange={this.handleListingDisplay}
                      >
                        Yes display my profile
                      </Radio>
                    </FormGroup>
                  </Well>

                  {this.state.listingCategory ===
                  'Counselor / Mental Health' ? (
                    <Well>
                      <h6>Professional Discipline</h6>
                      <FormGroup controlId="professionalDiscipline">
                        <ControlLabel className="required">*</ControlLabel>
                        <ControlLabel>Select one Discipline</ControlLabel>
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline ===
                            'Counselor / Therapist'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Counselor / Therapist"
                          required
                          onChange={this.handleDiscipline}
                        >
                          Counselor / Therapist
                        </Radio>{' '}
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline === 'Psychiatrist'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Psychiatrist"
                          onChange={this.handleDiscipline}
                        >
                          Psychiatrist
                        </Radio>{' '}
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline === 'Psychologist'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Psychologist"
                          onChange={this.handleDiscipline}
                        >
                          Psychologist
                        </Radio>{' '}
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline ===
                            'Social Worker'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Social Worker"
                          onChange={this.handleDiscipline}
                        >
                          Social Worker
                        </Radio>{' '}
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Dietitian' ? (
                    <Well>
                      <h6>Professional Discipline</h6>
                      <FormGroup controlId="professionalDiscipline">
                        <ControlLabel className="required">*</ControlLabel>
                        <ControlLabel>Select one Discipline</ControlLabel>
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline ===
                            'Registerd Dietitian'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Registerd Dietitian"
                          required
                          onChange={this.handleDiscipline}
                        >
                          Registerd Dietitian
                        </Radio>{' '}
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Feeding Therapist' ? (
                    <Well>
                      <h6>Professional Discipline</h6>
                      <FormGroup controlId="professionalDiscipline">
                        <ControlLabel className="required">*</ControlLabel>
                        <ControlLabel>Select one Discipline</ControlLabel>
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline ===
                            'Occupational Therapist'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Occupational Therapist"
                          required
                          onChange={this.handleDiscipline}
                        >
                          Occupational Therapist
                        </Radio>
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline ===
                            'Behavioral / Clinical Child Psychologist'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Behavioral / Clinical Child Psychologist"
                          onChange={this.handleDiscipline}
                        >
                          Behavioral / Clinical Child Psychologist
                        </Radio>
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline ===
                            'Physical Therapist'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Physical Therapist"
                          onChange={this.handleDiscipline}
                        >
                          Physical Therapist
                        </Radio>
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline ===
                            'Speech Language Pathologist'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Speech Language Pathologist"
                          onChange={this.handleDiscipline}
                        >
                          Speech Language Pathologist
                        </Radio>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Medical Care Provider' ? (
                    <Well>
                      <h6>Professional Discipline</h6>
                      <FormGroup controlId="professionalDiscipline">
                        <ControlLabel className="required">*</ControlLabel>
                        <ControlLabel>Select one Discipline</ControlLabel>
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline ===
                            'Nurse Practitioner'
                              ? true
                              : false
                          }
                          required
                          name="radioDiscipline"
                          value="Nurse Practitioner"
                          onChange={this.handleDiscipline}
                        >
                          Nurse Practitioner
                        </Radio>{' '}
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline === 'Psychiatrist'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Psychiatrist"
                          required
                          onChange={this.handleDiscipline}
                        >
                          Psychiatrist
                        </Radio>{' '}
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline === 'Physician'
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Physician"
                          required
                          onChange={this.handleDiscipline}
                        >
                          Physician
                        </Radio>{' '}
                        <Radio
                          defaultChecked={
                            this.state.professionalDiscipline ===
                            "Physician's Assistant"
                              ? true
                              : false
                          }
                          name="radioDiscipline"
                          value="Physician's Assistant"
                          required
                          onChange={this.handleDiscipline}
                        >
                          Physician's Assistant
                        </Radio>{' '}
                      </FormGroup>
                    </Well>
                  ) : null}

                  <Well>
                    <h6>Licensure</h6>
                    <FormGroup controlId="licenseState">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>State</ControlLabel>
                      <FormControl
                        componentClass="select"
                        required
                        defaultValue={this.state.licenseState}
                        onChange={this.handleChange}
                      >
                        <option value="">-- Select State --</option>
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
                      <ControlLabel>
                        <span className="required">*</span>Enter your state
                        license number (state credential number for WA state).
                        This field is used to validate your credentials. It is
                        treated with confidentiality and will not be displayed
                        in your profile.
                      </ControlLabel>
                      <FormControl
                        required
                        type="text"
                        defaultValue={this.state.licenseNumber}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="licenseStanding">
                      <Well>
                        <ControlLabel className="required">*</ControlLabel>
                        <ControlLabel>Check standing</ControlLabel>
                        <Checkbox
                          required
                          onChange={this.handleLicenseChange}
                          defaultChecked={this.state.licenseStanding}
                        >
                          I am in good standing with the state and national
                          liscensing or certification bodies required for my
                          profession
                        </Checkbox>
                      </Well>
                    </FormGroup>
                  </Well>
                  <Well>
                    <h6>Place of Employment</h6>
                    <FormGroup controlId="empOrganization">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>Organization / Company</ControlLabel>
                      <FormControl
                        required
                        type="text"
                        defaultValue={this.state.empOrganization}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="empUrl">
                      <ControlLabel>Employer's Website</ControlLabel>
                      <FormControl
                        type="text"
                        defaultValue={
                          this.state.empUrl === false ? '' : this.state.empUrl
                        }
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Well>
                  <Well>
                    <h6>Work Contact Information</h6>
                    <FormGroup controlId="workAddress1">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>Work Address 1</ControlLabel>
                      <FormControl
                        required
                        type="text"
                        defaultValue={this.state.workAddress1}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="workAddress2">
                      <ControlLabel>Work Address 2</ControlLabel>
                      <FormControl
                        type="text"
                        defaultValue={
                          this.state.workAddress2 === false
                            ? ''
                            : this.state.workAddress2
                        }
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="workCity">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>City</ControlLabel>
                      <FormControl
                        required
                        type="text"
                        defaultValue={this.state.workCity}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="workState">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>State</ControlLabel>
                      <FormControl
                        componentClass="select"
                        required
                        defaultValue={this.state.workState}
                        onChange={this.handleChange}
                      >
                        <option value="">-- Select State --</option>
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
                    <FormGroup controlId="workZip">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>Zip Code</ControlLabel>
                      <FormControl
                        required
                        type="text"
                        defaultValue={this.state.workZip}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="workPhone">
                      <ControlLabel className="required">*</ControlLabel>
                      <ControlLabel>
                        Appointment Scheduling Phone Number
                      </ControlLabel>
                      <FormControl
                        required
                        type="text"
                        defaultValue={this.state.workPhone}
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="workExtension">
                      <ControlLabel>Extension</ControlLabel>
                      <FormControl
                        type="text"
                        defaultValue={
                          this.state.workExtension === false
                            ? ''
                            : this.state.workExtension
                        }
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                    <FormGroup controlId="workEmail">
                      <ControlLabel>
                        Email - Complete this optional field if you wish
                        families or providers to contact you via email. This
                        email will display on your public listing.
                      </ControlLabel>
                      <FormControl
                        type="text"
                        defaultValue={
                          this.state.workEmail === false
                            ? ''
                            : this.state.workEmail
                        }
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Well>
                  <Well>
                    <h6>Provider Group</h6>
                    <FormGroup controlId="providerGroup">
                      <FormControl
                        componentClass="select"
                        defaultValue={this.state.providerGroup}
                        onChange={this.handleChange}
                      >
                        <option value="">-- Select Provider Group --</option>
                        <option value="Boyer Children's Clinic (WA)">
                          Boyer Children's Clinic (WA)
                        </option>
                        <option value="Cildren's Therapy Center of Kent (WA)">
                          Cildren's Therapy Center of Kent (WA)
                        </option>
                        <option value="Children's Therapy Center of Woodinville (WA)">
                          Children's Therapy Center of Woodinville (WA)
                        </option>
                        <option value="Mosaic Center for Therapy Services (WA)">
                          Mosaic Center for Therapy Services (WA)
                        </option>
                        <option value="Northwest Center (WA)">
                          Northwest Center (WA)
                        </option>
                        <option value="Pediatric Speech and Language Therapy (WA)">
                          Pediatric Speech and Language Therapy (WA)
                        </option>
                        <option value="Private practice">
                          Private practice
                        </option>
                        <option value="Seattle Childen's Hospital (WA)">
                          Seattle Children's Hospital (WA)
                        </option>
                        <option value="Swedish Hospital (WA)">
                          Swedish Hospital (WA)
                        </option>
                        <option value="University of Washington (WA)">
                          University of Washington (WA)
                        </option>
                        <option value="Valley Medical Center (WA)">
                          Valley Medical Center (WA)
                        </option>
                      </FormControl>
                    </FormGroup>
                    <FormGroup controlId="providerGroupText">
                      <ControlLabel>
                        Enter provider group if not found in the above select
                        list
                      </ControlLabel>
                      <FormControl
                        type="text"
                        defaultValue={
                          this.state.providerGroupText === false
                            ? ''
                            : this.state.providerGroupText
                        }
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </Well>

                  {this.state.listingCategory === 'Counselor / Mental Health' ||
                  this.state.listingCategory === 'Feeding Therapist' ? (
                    <Well>
                      <h6 id="workSettingReq">Work Setting</h6>
                      <FormGroup
                        controlId="workSetting"
                        onChange={e =>
                          this.handleMultipleChange(e, 'workSetting')
                        }
                      >
                        <ControlLabel>
                          Select all work settings that apply<span className="required">
                            *
                          </span>
                        </ControlLabel>
                        <Checkbox
                          value="Center-based services"
                          defaultChecked={
                            this.state.workSetting.includes(
                              'Center-based services'
                            )
                              ? true
                              : false
                          }
                        >
                          Center-based services
                        </Checkbox>

                        <Checkbox
                          value="Early Intervention program"
                          defaultChecked={
                            this.state.workSetting.includes(
                              'Early Intervention program'
                            )
                              ? true
                              : false
                          }
                        >
                          Early Intervention program
                        </Checkbox>

                        <Checkbox
                          value="Home-based services"
                          defaultChecked={
                            this.state.workSetting.includes(
                              'Home-based services'
                            )
                              ? true
                              : false
                          }
                        >
                          Home-based services
                        </Checkbox>

                        <Checkbox
                          value="Hospital inpatient"
                          defaultChecked={
                            this.state.workSetting.includes(
                              'Hospital inpatient'
                            )
                              ? true
                              : false
                          }
                        >
                          Hospital inpatient
                        </Checkbox>

                        <Checkbox
                          value="Hospital outpatient"
                          defaultChecked={
                            this.state.workSetting.includes(
                              'Hospital outpatient'
                            )
                              ? true
                              : false
                          }
                        >
                          Hospital outpatient
                        </Checkbox>

                        <Checkbox
                          value="Private practice"
                          defaultChecked={
                            this.state.workSetting.includes('Private practice')
                              ? true
                              : false
                          }
                        >
                          Private practice
                        </Checkbox>

                        <Checkbox
                          value="School based"
                          defaultChecked={
                            this.state.workSetting.includes('School based')
                              ? true
                              : false
                          }
                        >
                          School based
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Dietitian' ? (
                    <Well>
                      <h6 id="workSettingReq">Work Setting</h6>
                      <FormGroup
                        controlId="workSetting"
                        onChange={e =>
                          this.handleMultipleChange(e, 'workSetting')
                        }
                      >
                        <ControlLabel>
                          Select all work settings that apply<span className="required">
                            *
                          </span>
                        </ControlLabel>
                        <Checkbox
                          defaultChecked={
                            this.state.workSetting.includes('Home health care')
                              ? true
                              : false
                          }
                          value="Home health care"
                        >
                          Home health care
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.workSetting.includes(
                              'Hospital inpatient'
                            )
                              ? true
                              : false
                          }
                          value="Hospital inpatient"
                        >
                          Hospital inpatient
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.workSetting.includes(
                              'Hospital outpatient'
                            )
                              ? true
                              : false
                          }
                          value="Hospital outpatient"
                        >
                          Hospital outpatient
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.workSetting.includes('Office setting')
                              ? true
                              : false
                          }
                          value="Office setting"
                        >
                          Office setting
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Medical Care Provider' ? (
                    <Well>
                      <h6 id="workSettingReq">Work Setting</h6>
                      <FormGroup
                        controlId="workSetting"
                        onChange={e =>
                          this.handleMultipleChange(e, 'workSetting')
                        }
                      >
                        <ControlLabel>
                          Select all work settings that apply<span className="required">
                            *
                          </span>
                        </ControlLabel>
                        <Checkbox
                          defaultChecked={
                            this.state.workSetting.includes('Hospital')
                              ? true
                              : false
                          }
                          value="Hospital"
                        >
                          Hospital
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.workSetting.includes('Office setting')
                              ? true
                              : false
                          }
                          value="Office setting"
                        >
                          Office setting
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Medical Care Provider' ? (
                    <Well>
                      <h6 id="medicalSpecialtyReq">Specialty</h6>
                      <FormGroup
                        controlId="medicalSpecialty"
                        onChange={e =>
                          this.handleMultipleChange(e, 'medicalSpecialty')
                        }
                      >
                        <ControlLabel>
                          Select all specialties that apply<span className="required">
                            *
                          </span>
                        </ControlLabel>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes('Cardiology')
                              ? true
                              : false
                          }
                          value="Cardiology"
                        >
                          Cardiology
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes('Craniofacial')
                              ? true
                              : false
                          }
                          value="Craniofacial"
                        >
                          Craniofacial
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes(
                              'Internal medicine'
                            )
                              ? true
                              : false
                          }
                          value="Internal medicine"
                        >
                          Internal medicine
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes('Neonatology')
                              ? true
                              : false
                          }
                          value="Neonatology"
                        >
                          Neonatology
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes('Neurology')
                              ? true
                              : false
                          }
                          value="Neurology"
                        >
                          Neurology
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes('Pediatrics')
                              ? true
                              : false
                          }
                          value="Pediatrics"
                        >
                          Pediatrics
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes('Pulmonology')
                              ? true
                              : false
                          }
                          value="Pulmonology"
                        >
                          Pulmonology
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes('Oncology')
                              ? true
                              : false
                          }
                          value="Oncology"
                        >
                          Oncology
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes('Radiology')
                              ? true
                              : false
                          }
                          value="Radiology"
                        >
                          Radiology
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes(
                              'Rehabilitation'
                            )
                              ? true
                              : false
                          }
                          value="Rehabilitation"
                        >
                          Rehabilitation
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalSpecialty.includes('Surgery')
                              ? true
                              : false
                          }
                          value="Surgery"
                        >
                          Surgery
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory ===
                  'Counselor / Mental Health' ? (
                    <Well>
                      <h6 id="certificationsReq">Certifications</h6>
                      <FormGroup
                        controlId="certifications"
                        onChange={e =>
                          this.handleMultipleChange(e, 'certifications')
                        }
                      >
                        <ControlLabel>
                          Select applicable certifications or select "none" if
                          not certified<span className="required">*</span>
                        </ControlLabel>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'Behavior Analyst Certi􏰀cation Board'
                            )
                              ? true
                              : false
                          }
                          value="Behavior Analyst Certi􏰀cation Board"
                        >
                          Behavior Analyst Certification Board
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'Licensed Clinical Social Worker'
                            )
                              ? true
                              : false
                          }
                          value="Licensed Clinical Social Worker"
                        >
                          Licensed Clinical Social Worker
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'Licensed Marriage and Family Therapist'
                            )
                              ? true
                              : false
                          }
                          value="Licensed Marriage and Family Therapist"
                        >
                          Licensed Marriage and Family Therapist
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'Licensed Master Social Worker'
                            )
                              ? true
                              : false
                          }
                          value="Licensed Master Social Worker"
                        >
                          Licensed Master Social Worker
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'Licensed Mental Health Counselor'
                            )
                              ? true
                              : false
                          }
                          value="Licensed Mental Health Counselor"
                        >
                          Licensed Mental Health Counselor
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'Licensed Professional Counselor'
                            )
                              ? true
                              : false
                          }
                          value="Licensed Professional Counselor"
                        >
                          Licensed Professional Counselor
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'National Board for Certified Counselors'
                            )
                              ? true
                              : false
                          }
                          value="National Board for Certified Counselors"
                        >
                          National Board for Certified Counselors
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'National Certified Counselor'
                            )
                              ? true
                              : false
                          }
                          value="National Certified Counselor"
                        >
                          National Certified Counselor
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes('None')
                              ? true
                              : false
                          }
                          value="None"
                        >
                          None
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Medical Care Provider' ? (
                    <Well>
                      <h6 id="certificationsReq">Certifications</h6>
                      <FormGroup
                        controlId="Certifications"
                        onChange={e =>
                          this.handleMultipleChange(e, 'certifications')
                        }
                      >
                        <ControlLabel>
                          Select applicable certifications or select "none" if
                          not certified<span className="required">*</span>
                        </ControlLabel>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'American Board of Otolaryngology - Head and Neck Surgery'
                            )
                              ? true
                              : false
                          }
                          value="American Board of Otolaryngology - Head and Neck Surgery"
                        >
                          American Board of Otolaryngology - Head and Neck
                          Surgery
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'American Board of Pediatrics'
                            )
                              ? true
                              : false
                          }
                          value="American Board of Pediatrics"
                        >
                          American Board of Pediatrics
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'American Board of Surgery'
                            )
                              ? true
                              : false
                          }
                          value="American Board of Surgery"
                        >
                          American Board of Surgery
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'Pediatric Surgery Specialty Board'
                            )
                              ? true
                              : false
                          }
                          value="Pediatric Surgery Specialty Board"
                        >
                          Pediatric Surgery Specialty Board
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'Pediatric Nursing Certification Board'
                            )
                              ? true
                              : false
                          }
                          value="Pediatric Nursing Certification Board"
                        >
                          Pediatric Nursing Certification Board
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'National Certification Board'
                            )
                              ? true
                              : false
                          }
                          value="National Certification Board"
                        >
                          National Certification Board
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes(
                              'National Commission on Certification of Physician Assistants'
                            )
                              ? true
                              : false
                          }
                          value="National Commission on Certification of Physician Assistants"
                        >
                          National Commission on Certification of Physician
                          Assistants
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.certifications.includes('None')
                              ? true
                              : false
                          }
                          value="None"
                        >
                          None
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Counselor / Mental Health' ||
                  this.state.listingCategory === 'Dietitian' ||
                  this.state.listingCategory === 'Feeding Therapist' ? (
                    <Well>
                      <h6 id="agesServedReq">Ages Served</h6>
                      <FormGroup
                        controlId="agesServed"
                        onChange={e =>
                          this.handleMultipleChange(e, 'agesServed')
                        }
                      >
                        <ControlLabel>
                          Select all ages served that apply<span className="required">
                            *
                          </span>
                        </ControlLabel>
                        <Checkbox
                          value="Infants: 0 - 12 months"
                          defaultChecked={
                            this.state.agesServed.includes(
                              'Infants: 0 - 12 months'
                            )
                              ? true
                              : false
                          }
                        >
                          Infants: 0 - 12 months
                        </Checkbox>
                        <Checkbox
                          value="Toddlers: 13 - 36 months"
                          defaultChecked={
                            this.state.agesServed.includes(
                              'Toddlers: 13 - 36 months'
                            )
                              ? true
                              : false
                          }
                        >
                          Toddlers: 13 - 36 months
                        </Checkbox>
                        <Checkbox
                          value="Preschool: 3 - 5 years"
                          defaultChecked={
                            this.state.agesServed.includes(
                              'Preschool: 3 - 5 years'
                            )
                              ? true
                              : false
                          }
                        >
                          Preschool: 3 - 5 years
                        </Checkbox>
                        <Checkbox
                          value="School age: 5 - 12 years"
                          defaultChecked={
                            this.state.agesServed.includes(
                              'School age: 5 - 12 years'
                            )
                              ? true
                              : false
                          }
                        >
                          School age: 5 - 12 years
                        </Checkbox>
                        <Checkbox
                          value="Adolescent: 13 - 21 years"
                          defaultChecked={
                            this.state.agesServed.includes(
                              'Adolescent: 13 - 21 years'
                            )
                              ? true
                              : false
                          }
                        >
                          Adolescent: 13 - 21 years
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Counselor / Mental Health' ||
                  this.state.listingCategory === 'Dietitian' ||
                  this.state.listingCategory === 'Feeding Therapist' ? (
                    <Well>
                      <h6 id="paymentTypesReq">Payment Types Accepted</h6>
                      <FormGroup
                        controlId="paymentTypes"
                        onChange={e =>
                          this.handleMultipleChange(e, 'paymentTypes')
                        }
                      >
                        <ControlLabel>
                          Select all payment types accepted<span className="required">
                            *
                          </span>
                        </ControlLabel>
                        <Checkbox
                          value="Medicaid"
                          defaultChecked={
                            this.state.paymentTypes.includes('Medicaid')
                              ? true
                              : false
                          }
                        >
                          Medicaid
                        </Checkbox>
                        <Checkbox
                          value="Private insurance"
                          defaultChecked={
                            this.state.paymentTypes.includes(
                              'Private insurance'
                            )
                              ? true
                              : false
                          }
                        >
                          Private insurance
                        </Checkbox>
                        <Checkbox
                          value="Private pay"
                          defaultChecked={
                            this.state.paymentTypes.includes('Private pay')
                              ? true
                              : false
                          }
                        >
                          Private pay
                        </Checkbox>
                        <Checkbox
                          value="Part C"
                          defaultChecked={
                            this.state.paymentTypes.includes('Part C')
                              ? true
                              : false
                          }
                        >
                          Part C
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory ===
                  'Counselor / Mental Health' ? (
                    <Well>
                      <h6>Mental Health / Counseling Services</h6>
                      <FormGroup
                        controlId="mentalHealth"
                        onChange={e =>
                          this.handleMultipleChange(e, 'mentalHealth')
                        }
                      >
                        <ControlLabel>
                          Select all counseling services you provide
                        </ControlLabel>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes(
                              'Applied Behavior Analysis'
                            )
                              ? true
                              : false
                          }
                          value="Applied Behavior Analysis"
                        >
                          Applied Behavior Analysis
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes(
                              'Child play therapy'
                            )
                              ? true
                              : false
                          }
                          value="Child play therapy"
                        >
                          Child play therapy
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes(
                              'Cognitive behavioral therapy'
                            )
                              ? true
                              : false
                          }
                          value="Cognitive behavioral therapy"
                        >
                          Cognitive behavioral therapy
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes(
                              'Family / marital counseling'
                            )
                              ? true
                              : false
                          }
                          value="Family / marital counseling"
                        >
                          Family / marital counseling
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes(
                              'General psychosocial and mental health support for families with special needs / medically fragile children and youth'
                            )
                              ? true
                              : false
                          }
                          value="General psychosocial and mental health support for families with special needs / medically fragile children and youth"
                        >
                          General psychosocial and mental health support for
                          families with special needs / medically fragile
                          children and youth
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes('Group therapy')
                              ? true
                              : false
                          }
                          value="Group therapy"
                        >
                          Group therapy
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes(
                              'Individual and family therapy'
                            )
                              ? true
                              : false
                          }
                          value="Individual and family therapy"
                        >
                          Individual and family therapy
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes(
                              'Parent counseling and support'
                            )
                              ? true
                              : false
                          }
                          value="Parent counseling and support"
                        >
                          Parent counseling and support
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes(
                              'Parent education / support groups'
                            )
                              ? true
                              : false
                          }
                          value="Parent education / support groups"
                        >
                          Parent education / support groups
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes(
                              'Sibling counseling'
                            )
                              ? true
                              : false
                          }
                          value="Sibling counseling"
                        >
                          Sibling counseling
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.mentalHealth.includes(
                              'Terminal illness / life-shortening conditions / grief work'
                            )
                              ? true
                              : false
                          }
                          value="Terminal illness / life-shortening conditions / grief work"
                        >
                          Terminal illness / life-shortening conditions / grief
                          work
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Counselor / Mental Health' ||
                  this.state.listingCategory === 'Feeding Therapist' ? (
                    <Well>
                      <h6>
                        Experience in Treating Children with These Medical
                        Conditions
                      </h6>
                      <FormGroup
                        controlId="medicalConditions"
                        onChange={e =>
                          this.handleMultipleChange(e, 'medicalConditions')
                        }
                      >
                        <ControlLabel>
                          Select all medical conditions you treat
                        </ControlLabel>
                        <Checkbox
                          value="Autism spectrum disorders"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Autism spectrum disorders'
                            )
                              ? true
                              : false
                          }
                        >
                          Autism spectrum disorders
                        </Checkbox>
                        <Checkbox
                          value="Cancer"
                          defaultChecked={
                            this.state.medicalConditions.includes('Cancer')
                              ? true
                              : false
                          }
                        >
                          Cancer
                        </Checkbox>
                        <Checkbox
                          value="Craniofacial anomalies (including cleft lip and palate)"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Craniofacial anomalies (including cleft lip and palate)'
                            )
                              ? true
                              : false
                          }
                        >
                          Craniofacial anomalies (including cleft lip and
                          palate)
                        </Checkbox>
                        <Checkbox
                          value="Developmental delay"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Developmental delay'
                            )
                              ? true
                              : false
                          }
                        >
                          Developmental delay
                        </Checkbox>
                        <Checkbox
                          value="Gastroesophageal reflux disease (GERD)"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Gastroesophageal reflux disease (GERD)'
                            )
                              ? true
                              : false
                          }
                        >
                          Gastroesophageal reflux disease (GERD)
                        </Checkbox>
                        <Checkbox
                          value="GI issued (short gut syndrome, necrotizing enterocolitis, eosinophilic esophagitis, etc)"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'GI issued (short gut syndrome, necrotizing enterocolitis, eosinophilic esophagitis, etc)'
                            )
                              ? true
                              : false
                          }
                        >
                          GI issued (short gut syndrome, necrotizing
                          enterocolitis, eosinophilic esophagitis, etc)
                        </Checkbox>
                        <Checkbox
                          value="Growth issues (FTT, poor weight gain)"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Growth issues (FTT, poor weight gain)'
                            )
                              ? true
                              : false
                          }
                        >
                          Growth issues (FTT, poor weight gain)
                        </Checkbox>
                        <Checkbox
                          value="G-tube placement"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'G-tube placement'
                            )
                              ? true
                              : false
                          }
                        >
                          G-tube placement
                        </Checkbox>
                        <Checkbox
                          value="Heart defects"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Heart defects'
                            )
                              ? true
                              : false
                          }
                        >
                          Heart defects
                        </Checkbox>
                        <Checkbox
                          value="Medically fragile children"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Medically fragile children'
                            )
                              ? true
                              : false
                          }
                        >
                          Medically fragile children
                        </Checkbox>
                        <Checkbox
                          value="Neurologic deficits (cerebral palsy, static encephalopathy, hydrocephalus, etc)"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Neurologic deficits (cerebral palsy, static encephalopathy, hydrocephalus, etc)'
                            )
                              ? true
                              : false
                          }
                        >
                          Neurologic deficits (cerebral palsy, static
                          encephalopathy, hydrocephalus, etc)
                        </Checkbox>
                        <Checkbox
                          value="NG/ND tube placement"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'NG/ND tube placement'
                            )
                              ? true
                              : false
                          }
                        >
                          NG/ND tube placement
                        </Checkbox>
                        <Checkbox
                          value="Premature infants"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Premature infants'
                            )
                              ? true
                              : false
                          }
                        >
                          Premature infants
                        </Checkbox>
                        <Checkbox
                          value="Pulmonary issues (chronic lung disease, reactive airway disease)"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Pulmonary issues (chronic lung disease, reactive airway disease)'
                            )
                              ? true
                              : false
                          }
                        >
                          Pulmonary issues (chronic lung disease, reactive
                          airway disease)
                        </Checkbox>
                        <Checkbox
                          value="Spinal cord injury"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Spinal cord injury'
                            )
                              ? true
                              : false
                          }
                        >
                          Spinal cord injury
                        </Checkbox>
                        <Checkbox
                          value="Tracheotomy/ventilator dependent"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Tracheotomy/ventilator dependent'
                            )
                              ? true
                              : false
                          }
                        >
                          Tracheotomy/ventilator dependent
                        </Checkbox>
                        <Checkbox
                          value="Traumatic brain injury"
                          defaultChecked={
                            this.state.medicalConditions.includes(
                              'Traumatic brain injury'
                            )
                              ? true
                              : false
                          }
                        >
                          Traumatic brain injury
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Counselor / Mental Health' ||
                  this.state.listingCategory === 'Feeding Therapist' ? (
                    <Well>
                      <h6>
                        Experience in Treating Children with These Feeding
                        Conditions
                      </h6>
                      <FormGroup
                        controlId="feedingConditions"
                        onChange={e =>
                          this.handleMultipleChange(e, 'feedingConditions')
                        }
                      >
                        <ControlLabel>
                          Select all feeding conditions of children you treat
                        </ControlLabel>
                        <Checkbox
                          value="Breastfeeding issues"
                          defaultChecked={
                            this.state.feedingConditions.includes(
                              'Breastfeeding issues'
                            )
                              ? true
                              : false
                          }
                        >
                          Breastfeeding issues
                        </Checkbox>
                        <Checkbox
                          value="Difficulty transitioning to solids"
                          defaultChecked={
                            this.state.feedingConditions.includes(
                              'Difficulty transitioning to solids'
                            )
                              ? true
                              : false
                          }
                        >
                          Difficulty transitioning to solids
                        </Checkbox>
                        <Checkbox
                          value="Non-oral feeders (fed via NG, ND, g-tube, etc)"
                          defaultChecked={
                            this.state.feedingConditions.includes(
                              'Non-oral feeders (fed via NG, ND, g-tube, etc)'
                            )
                              ? true
                              : false
                          }
                        >
                          Non-oral feeders (fed via NG, ND, g-tube, etc)
                        </Checkbox>
                        <Checkbox
                          value="Oral aversion"
                          defaultChecked={
                            this.state.feedingConditions.includes(
                              'Oral aversion'
                            )
                              ? true
                              : false
                          }
                        >
                          Oral aversion
                        </Checkbox>
                        <Checkbox
                          value="Oral sensory dysfunction"
                          defaultChecked={
                            this.state.feedingConditions.includes(
                              'Oral sensory dysfunction'
                            )
                              ? true
                              : false
                          }
                        >
                          Oral sensory dysfunction
                        </Checkbox>
                        <Checkbox
                          value="Oral dyspraxia/apraxia"
                          defaultChecked={
                            this.state.feedingConditions.includes(
                              'Oral dyspraxia/apraxia'
                            )
                              ? true
                              : false
                          }
                        >
                          Oral dyspraxia/apraxia
                        </Checkbox>
                        <Checkbox
                          value="Psychosocial dysfunction related to feeding"
                          defaultChecked={
                            this.state.feedingConditions.includes(
                              'Psychosocial dysfunction related to feeding'
                            )
                              ? true
                              : false
                          }
                        >
                          Psychosocial dysfunction related to feeding
                        </Checkbox>
                        <Checkbox
                          value="Swallowing difficulty"
                          defaultChecked={
                            this.state.feedingConditions.includes(
                              'Swallowing difficulty'
                            )
                              ? true
                              : false
                          }
                        >
                          Swallowing difficulty
                        </Checkbox>
                        <Checkbox
                          value="Tongue tie"
                          defaultChecked={
                            this.state.feedingConditions.includes('Tongue tie')
                              ? true
                              : false
                          }
                        >
                          Tongue tie
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Dietitian' ? (
                    <Well>
                      <h6>Feeding Clinical Practice Secialties</h6>
                      <FormGroup
                        controlId="practiceSpecialties"
                        onChange={e =>
                          this.handleMultipleChange(e, 'practiceSpecialties')
                        }
                      >
                        <ControlLabel>
                          Select all practice areas related to feeding that
                          apply
                        </ControlLabel>
                        <Checkbox
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Behavioral management'
                            )
                              ? true
                              : false
                          }
                          value="Behavioral management"
                        >
                          Behavioral management
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Blenderized diets'
                            )
                              ? true
                              : false
                          }
                          value="Blenderized diets"
                        >
                          Blenderized diets
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Breastfeeding management'
                            )
                              ? true
                              : false
                          }
                          value="Breastfeeding management"
                        >
                          Breastfeeding management
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Nutritional assessment and management'
                            )
                              ? true
                              : false
                          }
                          value="Nutritional assessment and management"
                        >
                          Nutritional assessment and management
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Weaning from feeding tubes'
                            )
                              ? true
                              : false
                          }
                          value="Weaning from feeding tubes"
                        >
                          Weaning from feeding tubes
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Feeding Therapist' ? (
                    <Well>
                      <h6>Feeding Clinical Practice Secialties</h6>
                      <FormGroup
                        controlId="practiceSpecialties"
                        onChange={e =>
                          this.handleMultipleChange(e, 'practiceSpecialties')
                        }
                      >
                        <ControlLabel>
                          Select all practice areas related to feeding that
                          apply
                        </ControlLabel>
                        <Checkbox
                          value="Behavioral management"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Behavioral management'
                            )
                              ? true
                              : false
                          }
                        >
                          Behavioral management
                        </Checkbox>
                        <Checkbox
                          value="Blenderized diets"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Blenderized diets'
                            )
                              ? true
                              : false
                          }
                        >
                          Blenderized diets
                        </Checkbox>
                        <Checkbox
                          value="Breastfeeding management"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Breastfeeding management'
                            )
                              ? true
                              : false
                          }
                        >
                          Breastfeeding management
                        </Checkbox>
                        <Checkbox
                          value="clinical feeding and / or swallowing assessment"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'clinical feeding and / or swallowing assessment'
                            )
                              ? true
                              : false
                          }
                        >
                          clinical feeding and / or swallowing assessment
                        </Checkbox>
                        <Checkbox
                          value="Craniosacral therapy"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Craniosacral therapy'
                            )
                              ? true
                              : false
                          }
                        >
                          Craniosacral therapy
                        </Checkbox>
                        <Checkbox
                          value="E stim / Vital stim"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'E stim / Vital stim'
                            )
                              ? true
                              : false
                          }
                        >
                          E stim / Vital stim
                        </Checkbox>
                        <Checkbox
                          value="Feeding groups"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Feeding groups'
                            )
                              ? true
                              : false
                          }
                        >
                          Feeding groups
                        </Checkbox>
                        <Checkbox
                          value="Fiberoptic endoscope evaluation of swallowing (FEES)"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Fiberoptic endoscope evaluation of swallowing (FEES)'
                            )
                              ? true
                              : false
                          }
                        >
                          Fiberoptic endoscope evaluation of swallowing (FEES)
                        </Checkbox>
                        <Checkbox
                          value="Food texture advancement"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Food texture advancement'
                            )
                              ? true
                              : false
                          }
                        >
                          Food texture advancement
                        </Checkbox>
                        <Checkbox
                          value="Kinesiotaping"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Kinesiotaping'
                            )
                              ? true
                              : false
                          }
                        >
                          Kinesiotaping
                        </Checkbox>
                        <Checkbox
                          value="Manual therapy"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Manual therapy'
                            )
                              ? true
                              : false
                          }
                        >
                          Manual therapy
                        </Checkbox>
                        <Checkbox
                          value="Nutritional assessment and management"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Nutritional assessment and management'
                            )
                              ? true
                              : false
                          }
                        >
                          Nutritional assessment and management
                        </Checkbox>
                        <Checkbox
                          value="Oral motor therapy"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Oral motor therapy'
                            )
                              ? true
                              : false
                          }
                        >
                          Oral motor therapy
                        </Checkbox>
                        <Checkbox
                          value="Psychosocial treatment"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Psychosocial treatment'
                            )
                              ? true
                              : false
                          }
                        >
                          Psychosocial treatment
                        </Checkbox>
                        <Checkbox
                          value="Sensory processing related to feeding"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Sensory processing related to feeding'
                            )
                              ? true
                              : false
                          }
                        >
                          Sensory processing related to feeding
                        </Checkbox>
                        <Checkbox
                          value="Videofluoroscopic swallowing studies (VFSS) / Modified barium swallows (MBS)"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Videofluoroscopic swallowing studies (VFSS) / Modified barium swallows (MBS)'
                            )
                              ? true
                              : false
                          }
                        >
                          Videofluoroscopic swallowing studies (VFSS) / Modified
                          barium swallows (MBS)
                        </Checkbox>
                        <Checkbox
                          value="Weaning from feeding tubes"
                          defaultChecked={
                            this.state.practiceSpecialties.includes(
                              'Weaning from feeding tubes'
                            )
                              ? true
                              : false
                          }
                        >
                          Weaning from feeding tubes
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Counselor / Mental Health' ||
                  this.state.listingCategory === 'Dietitian' ||
                  this.state.listingCategory === 'Feeding Therapist' ? (
                    <Well>
                      <h6>Years of Experience Related to Pediatric Feeding</h6>
                      <FormGroup controlId="yearsExperience">
                        <ControlLabel className="required">*</ControlLabel>
                        <ControlLabel>
                          Select one experience category
                        </ControlLabel>
                        <Radio
                          defaultChecked={
                            this.state.yearsExperience === '0 - 5 years'
                              ? true
                              : false
                          }
                          name="radioExperience"
                          value="0 - 5 years"
                          required
                          onChange={this.handleExperience}
                        >
                          0 - 5 years
                        </Radio>{' '}
                        <Radio
                          defaultChecked={
                            this.state.yearsExperience === '5 - 10 years'
                              ? true
                              : false
                          }
                          name="radioExperience"
                          value="5 - 10 years"
                          onChange={this.handleExperience}
                        >
                          5 - 10 years
                        </Radio>{' '}
                        <Radio
                          defaultChecked={
                            this.state.yearsExperience === '10+ years'
                              ? true
                              : false
                          }
                          name="radioExperience"
                          value="10+ years"
                          onChange={this.handleExperience}
                        >
                          10+ years
                        </Radio>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Medical Care Provider' ? (
                    <Well>
                      <h6>
                        Experience Treating Patients with the Following Issues
                        or Conditions
                      </h6>
                      <FormGroup
                        controlId="medicalExperienceTreating"
                        onChange={e =>
                          this.handleMultipleChange(
                            e,
                            'medicalExperienceTreating'
                          )
                        }
                      >
                        <ControlLabel>
                          Select all issues or conditions that apply
                        </ControlLabel>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalExperienceTreating.includes(
                              'Central lines for long-term total parenteral nutrition'
                            )
                              ? true
                              : false
                          }
                          value="Central lines for long-term total parenteral nutrition"
                        >
                          Central lines for long-term total parenteral nutrition
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalExperienceTreating.includes(
                              'Food allergies'
                            )
                              ? true
                              : false
                          }
                          value="Food allergies"
                        >
                          Food allergies
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalExperienceTreating.includes(
                              'Gastrostomy tubes or other tube feedings'
                            )
                              ? true
                              : false
                          }
                          value="Gastrostomy tubes or other tube feedings"
                        >
                          Gastrostomy tubes or other tube feedings
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalExperienceTreating.includes(
                              'Growth faltering'
                            )
                              ? true
                              : false
                          }
                          value="Growth faltering"
                        >
                          Growth faltering
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalExperienceTreating.includes(
                              'History of genetic issues, birth defects, illnesses, surgeries affecting feeding and eating'
                            )
                              ? true
                              : false
                          }
                          value="History of genetic issues, birth defects, illnesses, surgeries affecting feeding and eating"
                        >
                          History of genetic issues, birth defects, illnesses,
                          surgeries affecting feeding and eating
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalExperienceTreating.includes(
                              'Neurodevelopmental issues'
                            )
                              ? true
                              : false
                          }
                          value="Neurodevelopmental issues"
                        >
                          Neurodevelopmental issues
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalExperienceTreating.includes(
                              'Sensory / behavioral feeding and eating challenges'
                            )
                              ? true
                              : false
                          }
                          value="Sensory / behavioral feeding and eating challenges"
                        >
                          Sensory / behavioral feeding and eating challenges
                        </Checkbox>
                        <Checkbox
                          defaultChecked={
                            this.state.medicalExperienceTreating.includes(
                              'Transition to oral feeding'
                            )
                              ? true
                              : false
                          }
                          value="Transition to oral feeding"
                        >
                          Transition to oral feeding
                        </Checkbox>
                      </FormGroup>
                    </Well>
                  ) : null}

                  {this.state.listingCategory === 'Medical Care Provider' ? (
                    <Well>
                      <h6>
                        Specific Education / Training on Pediatric Feeding
                      </h6>
                      <FormGroup controlId="medicalEducation1">
                        <ControlLabel>
                          If none, this section will not display on your listing
                        </ControlLabel>
                        <br />
                        <ControlLabel>1</ControlLabel>
                        <FormControl
                          type="text"
                          defaultValue={this.state.medicalEducation1}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                      <FormGroup controlId="medicalEducation2">
                        <ControlLabel>2</ControlLabel>
                        <FormControl
                          type="text"
                          defaultValue={this.state.medicalEducation2}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                      <FormGroup controlId="medicalEducation3">
                        <ControlLabel>3</ControlLabel>
                        <FormControl
                          type="text"
                          defaultValue={this.state.medicalEducation3}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Well>
                  ) : null}
                  {this.state.listingCategory === 'Medical Care Provider' ? (
                    <Well>
                      <h6>
                        Research / Publication / Presentations on Pediatric
                        Feeding
                      </h6>
                      <FormGroup controlId="medicalResearch1">
                        <ControlLabel>
                          If none, this section will not display on your listing
                        </ControlLabel>
                        <br />
                        <ControlLabel>1</ControlLabel>
                        <FormControl
                          type="text"
                          defaultValue={this.state.medicalResearch1}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                      <FormGroup controlId="medicalResearch2">
                        <ControlLabel>2</ControlLabel>
                        <FormControl
                          type="text"
                          defaultValue={this.state.medicalResearch2}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                      <FormGroup controlId="medicalResearch3">
                        <ControlLabel>3</ControlLabel>
                        <FormControl
                          type="text"
                          defaultValue={this.state.medicalResearch3}
                          onChange={this.handleChange}
                        />
                      </FormGroup>
                    </Well>
                  ) : null}

                  <Well>
                    <h6>Agreements</h6>
                    <FormGroup controlId="toc">
                      <ControlLabel>
                        Terms and Conditions<span className="required">*</span>
                      </ControlLabel>
                      <Checkbox
                        required
                        onChange={this.handleTocChange}
                        defaultChecked={this.state.toc}
                      >
                        I have read the terms and conditions and certify that
                        the above data is accurate and true and that I have
                        liability insurance. I understand that PedsFeeds.com is
                        not liable for any consequences resulting from my
                        feeding practice.
                      </Checkbox>
                    </FormGroup>
                  </Well>
                  <Well>
                    <FormGroup controlId="file">
                      <ControlLabel>Attach a new photo?</ControlLabel>
                      <FormControl
                        onChange={this.handleFileChange}
                        type="file"
                      />
                    </FormGroup>
                  </Well>
                  {updatedListing ? (
                    <p className="success-message">
                      Your listing was successfully updated
                    </p>
                  ) : null}
                  <ButtonToolbar>
                    <LoaderButton
                      block
                      bsStyle="success"
                      bsSize="large"
                      type="submit"
                      isLoading={this.state.isLoading}
                      text="Update listing"
                      loadingText="Updating listing"
                    />
                    {/* <Button
                      bsStyle="primary"
                      bsSize="large"
                      onClick={this.handleDelete}
                    >
                      Delete listing
                    </Button> */}
                    <Button
                      bsStyle="primary"
                      bsSize="large"
                      active
                      href="/profile"
                    >
                      Cancel
                    </Button>
                  </ButtonToolbar>
                </Form>
              </div>
          </div>
        ) : null}
      </div>
    )
  }
}
