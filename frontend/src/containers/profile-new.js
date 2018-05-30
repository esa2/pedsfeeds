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

export default class ProfileNew extends Component {
  constructor(props) {
    super(props)

    this.file = null
    this.handleChange = this.handleChange.bind(this)
    this.handleListingDisplay = this.handleListingDisplay.bind(this)
    this.handleDiscipline = this.handleDiscipline.bind(this)
    this.handleExperience = this.handleExperience.bind(this)

    this.state = {
      isLoading: false,
      approvedListing: true,
      listingTitle: '',
      lastName: '',
      firstName: '',
      displayListing: false,
      professionalDiscipline: '',
      licenseState: '',
      licenseStanding: false,
      licenseNumber: '',
      empOrganization: '',
      empUrl: '',
      workAddress1: '',
      workAddress2: '',
      workCity: '',
      workState: '',
      workZip: '',
      workPhone: '',
      workExtension: '',
      workEmail: '',
      providerGroup: '',
      providerGroupText: '',
      workSetting: [],
      agesServed: [],
      paymentTypes: [],
      medicalConditions: [],
      feedingConditions: [],
      practiceSpecialties: [],
      certifications: [],
      mentalHealth: [],
      medicalSpecialty: [],
      medicalExperienceTreating: [],
      medicalEducation1: '',
      medicalEducation2: '',
      medicalEducation3: '',
      medicalResearch1: '',
      medicalResearch2: '',
      medicalResearch3: '',
      yearsExperience: '',
      toc: false,
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
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${fetchStreet},+${city},+${state}&key=MAP_API`)
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
      const address = await this.fetchAddress(this.state.workAddress1, this.state.workCity, this.state.workState)
      this.setState({ lat: address.results[0].geometry.location.lat, lng: address.results[0].geometry.location.lng })
    } catch (error) {
      alert(error)
    }

    try {
      const attachment = this.file ? await s3Upload(this.file) : null

      await this.createProfile({
        attachment,
        approvedListing: this.state.approvedListing,
        listingCategory: this.props.value,
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
        workAddress2: this.state.workAddress2 !== '' ? this.state.workAddress2 : false,
        workCity: this.state.workCity,
        workState: this.state.workState,
        workZip: this.state.workZip,
        workPhone: this.state.workPhone,
        workExtension: this.state.workExtension !== '' ? this.state.workExtension : false,
        workEmail: this.state.workEmail !== '' ? this.state.workEmail : false,
        providerGroup: this.state.providerGroup !== '' ? this.state.providerGroup : false,
        providerGroupText: this.state.providerGroupText !== '' ? this.state.providerGroupText : false,
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
        medicalEducation1: this.state.medicalEducation1 !== '' ? this.state.medicalEducation1: false,
        medicalEducation2: this.state.medicalEducation2 !== '' ? this.state.medicalEducation2: false,
        medicalEducation3: this.state.medicalEducation3 !== '' ? this.state.medicalEducation3: false,
        medicalResearch1: this.state.medicalResearch1 !== '' ? this.state.medicalResearch1: false,
        medicalResearch2: this.state.medicalResearch2 !== '' ? this.state.medicalResearch2: false,
        medicalResearch3: this.state.medicalResearch3 !== '' ? this.state.medicalResearch3: false,
        yearsExperience: this.state.yearsExperience !== '' ? this.state.yearsExperience: false,
        toc: this.state.toc,
        lat: this.state.lat,
        lng: this.state.lng,
      })
      // this.props.history.push('/profile')
    } catch (error) {
      alert(error)
      this.setState({ isLoading: false })
    }
  }

  createProfile(profile) {
    return API.post('peds', '/profile', {
      body: profile,
    })
  }

  checkRequired(e) {
    e.preventDefault()
    if (this.state.workSetting.length === 0) {
      const requiredCheckbox = document.getElementById("workSettingReq")
      requiredCheckbox.scrollIntoView()
      return
    }
    if (this.props.value === 'Medical Care Provider') {
      if (this.state.medicalSpecialty.length === 0) {
        const requiredCheckbox = document.getElementById("medicalSpecialtyReq")
        requiredCheckbox.scrollIntoView()
        return
      }
    }
    if (this.props.value === 'Counselor / Mental Health' || this.props.value === 'Medical Care Provider') {
      if (this.state.certifications.length === 0) {
        const requiredCheckbox = document.getElementById("certificationsReq")
        requiredCheckbox.scrollIntoView()
        return
      }
    }
    if (this.props.value !== 'Medical Care Provider') {
      if (this.state.agesServed.length === 0) {
        const requiredCheckbox = document.getElementById("agesServedReq")
        requiredCheckbox.scrollIntoView()
        return
      }
    }
    if (this.props.value !== 'Medical Care Provider') {
      if (this.state.paymentTypes.length === 0) {
        const requiredCheckbox = document.getElementById("paymentTypesReq")
        requiredCheckbox.scrollIntoView()
        return
      }
    }
    this.handleSubmit(e)
  }

  render() {
    const listingCategory = this.props.value
    return (
      <div>
        <h6 className="header-green-center">{this.props.value} listing</h6>
        <p>
          Required fields<span className="required">*</span>
        </p>
        <Form onSubmit={e => this.checkRequired(e)}>
          <Well>
            <h6>Listing Title</h6>
            <FormGroup controlId="listingTitle">
              <ControlLabel className="required">*</ControlLabel>
              <ControlLabel>Your name and post-nominal initials</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.listingTitle}
                required
                placeholder="e.g. Last, First, XX"
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
                value={this.state.lastName}
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
                defaultChecked
                name="radioDisplay"
                onChange={this.handleListingDisplay}
              >
                No thanks please keep it private
              </Radio>{' '}
              <Radio name="radioDisplay" onChange={this.handleListingDisplay}>
                Yes display my profile
              </Radio>{' '}
            </FormGroup>
          </Well>

          {listingCategory === 'Counselor / Mental Health' ? (
            <Well>
              <h6>Professional Discipline</h6>
              <FormGroup controlId="professionalDiscipline">
                <ControlLabel className="required">*</ControlLabel>
                <ControlLabel>Select one Discipline</ControlLabel>
                <Radio
                  name="radioDiscipline"
                  value="Counselor / Therapist"
                  required
                  onChange={this.handleDiscipline}
                >
                  Counselor / Therapist
                </Radio>{' '}
                <Radio
                  name="radioDiscipline"
                  value="Psychiatrist"
                  onChange={this.handleDiscipline}
                >
                  Psychiatrist
                </Radio>{' '}
                <Radio
                  name="radioDiscipline"
                  value="Psychologist"
                  onChange={this.handleDiscipline}
                >
                  Psychologist
                </Radio>{' '}
                <Radio
                  name="radioDiscipline"
                  value="Social Worker"
                  onChange={this.handleDiscipline}
                >
                  Social Worker
                </Radio>{' '}
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Dietitian' ? (
            <Well>
              <h6>Professional Discipline</h6>
              <FormGroup controlId="professionalDiscipline">
                <ControlLabel className="required">*</ControlLabel>
                <ControlLabel>Select one Discipline</ControlLabel>
                <Radio
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

          {listingCategory === 'Feeding Therapist' ? (
            <Well>
              <h6>Professional Discipline</h6>
              <FormGroup controlId="professionalDiscipline">
                <ControlLabel className="required">*</ControlLabel>
                <ControlLabel>Select one Discipline</ControlLabel>
                <Radio
                  name="radioDiscipline"
                  value="Occupational Therapist"
                  required
                  onChange={this.handleDiscipline}
                >
                  Occupational Therapist
                </Radio>{' '}
                <Radio
                  name="radioDiscipline"
                  value="Behavioral / Clinical Child Psychologist"
                  onChange={this.handleDiscipline}
                >
                  Behavioral / Clinical Child Psychologist
                </Radio>{' '}
                <Radio
                  name="radioDiscipline"
                  value="Physical Therapist"
                  onChange={this.handleDiscipline}
                >
                  Physical Therapist
                </Radio>{' '}
                <Radio
                  name="radioDiscipline"
                  value="Speech Language Pathologist"
                  onChange={this.handleDiscipline}
                >
                  Speech Language Pathologist
                </Radio>{' '}
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Medical Care Provider' ? (
            <Well>
              <h6>Professional Discipline</h6>
              <FormGroup controlId="professionalDiscipline">
                <ControlLabel className="required">*</ControlLabel>
                <ControlLabel>Select one Discipline</ControlLabel>
                <Radio
                  required
                  name="radioDiscipline"
                  value="Nurse Practitioner"
                  onChange={this.handleDiscipline}
                >
                  Nurse Practitioner
                </Radio>{' '}
                <Radio
                  name="radioDiscipline"
                  value="Psychiatrist"
                  required
                  onChange={this.handleDiscipline}
                >
                  Psychiatrist
                </Radio>{' '}
                <Radio
                  name="radioDiscipline"
                  value="Physician"
                  required
                  onChange={this.handleDiscipline}
                >
                  Physician
                </Radio>{' '}
                <Radio
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
                value={this.state.licenseState}
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
                <span className="required">*</span>Enter your state license
                number (state credential number for WA state). This field is
                used to validate your credentials. It is treated with
                confidentiality and will not be displayed in your profile.
              </ControlLabel>
              <FormControl
                required
                type="text"
                value={this.state.licenseNumber}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="licenseStanding">
              <Well>
                <ControlLabel className="required">*</ControlLabel>
                <ControlLabel>Check standing</ControlLabel>
                <Checkbox required onChange={this.handleLicenseChange}>
                  I am in good standing with the state and national liscensing
                  or certification bodies required for my profession
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
                value={this.state.empOrganization}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="empUrl">
              <ControlLabel>Employer's Website</ControlLabel>
              <FormControl
                type="text"
                value={this.state.empUrl}
                placeholder=""
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
                value={this.state.workAddress1}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="workAddress2">
              <ControlLabel>Work Address 2</ControlLabel>
              <FormControl
                type="text"
                value={this.state.workAddress2}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="workCity">
              <ControlLabel className="required">*</ControlLabel>
              <ControlLabel>City</ControlLabel>
              <FormControl
                required
                type="text"
                value={this.state.workCity}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="workState">
              <ControlLabel className="required">*</ControlLabel>
              <ControlLabel>State</ControlLabel>
              <FormControl
                componentClass="select"
                required
                value={this.state.workState}
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
                value={this.state.workZip}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="workPhone">
              <ControlLabel className="required">*</ControlLabel>
              <ControlLabel>Appointment Scheduling Phone Number</ControlLabel>
              <FormControl
                required
                type="text"
                value={this.state.workPhone}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="workExtension">
              <ControlLabel>Extension</ControlLabel>
              <FormControl
                type="number"
                placeholder="0 - 9"
                value={this.state.workExtension}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="workEmail">
              <ControlLabel>
                Email - Complete this optional field if you wish families or
                providers to contact you via email. This email will display on
                your public listing.
              </ControlLabel>
              <FormControl
                type="text"
                value={this.state.workEmail}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Well>
          <Well>
            <h6>Provider Group</h6>
            <FormGroup controlId="providerGroup">
              <FormControl
                componentClass="select"
                value={this.state.providerGroup}
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
                <option value="Private practice">Private practice</option>
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
                Enter provider group if not found in the above select list
              </ControlLabel>
              <FormControl
                type="text"
                value={this.state.providerGroupText}
                onChange={this.handleChange}
              />
            </FormGroup>
          </Well>

          {listingCategory === 'Counselor / Mental Health' ||
          listingCategory === 'Feeding Therapist' ? (
            <Well>
              <h6 id="workSettingReq">Work Setting</h6>
              <FormGroup
                controlId="workSetting"
                onChange={e => this.handleMultipleChange(e, 'workSetting')}
              >
                <ControlLabel>
                  Select all work settings that apply<span className="required">
                    *
                  </span>
                </ControlLabel>
                <Checkbox value="Center-based services">
                  Center-based services
                </Checkbox>
                <Checkbox value="Early Intervention program">
                  Early Intervention program
                </Checkbox>
                <Checkbox value="Home-based services">
                  Home-based services
                </Checkbox>
                <Checkbox value="Hospital inpatient">
                  Hospital inpatient
                </Checkbox>
                <Checkbox value="Hospital outpatient">
                  Hospital outpatient
                </Checkbox>
                <Checkbox value="Private practice">Private practice</Checkbox>
                <Checkbox value="School based">School based</Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Dietitian' ? (
            <Well>
              <h6 id="workSettingReq">Work Setting</h6>
              <FormGroup
                controlId="workSetting"
                onChange={e => this.handleMultipleChange(e, 'workSetting')}
              >
                <ControlLabel>
                  Select all work settings that apply<span className="required">
                    *
                  </span>
                </ControlLabel>
                <Checkbox value="Home health care">Home health care</Checkbox>
                <Checkbox value="Hospital inpatient">
                  Hospital inpatient
                </Checkbox>
                <Checkbox value="Hospital outpatient">
                  Hospital outpatient
                </Checkbox>
                <Checkbox value="Office setting">Office setting</Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Medical Care Provider' ? (
            <Well>
              <h6 id="workSettingReq">Work Setting</h6>
              <FormGroup
                controlId="workSetting"
                onChange={e => this.handleMultipleChange(e, 'workSetting')}
              >
                <ControlLabel>
                  Select all work settings that apply<span className="required">
                    *
                  </span>
                </ControlLabel>
                <Checkbox value="Hospital">Hospital</Checkbox>
                <Checkbox value="Office setting">Office setting</Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Medical Care Provider' ? (
            <Well>
              <h6 id="medicalSpecialtyReq">Specialty</h6>
              <FormGroup
                controlId="medicalSpecialty"
                onChange={e => this.handleMultipleChange(e, 'medicalSpecialty')}
              >
                <ControlLabel>
                  Select all specialties that apply<span className="required">
                    *
                  </span>
                </ControlLabel>
                <Checkbox value="Cardiology">Cardiology</Checkbox>
                <Checkbox value="Craniofacial">Craniofacial</Checkbox>
                <Checkbox value="Internal medicine">Internal medicine</Checkbox>
                <Checkbox value="Neonatology">Neonatology</Checkbox>
                <Checkbox value="Neurology">Neurology</Checkbox>
                <Checkbox value="Pediatrics">Pediatrics</Checkbox>
                <Checkbox value="Pulmonology">Pulmonology</Checkbox>
                <Checkbox value="Oncology">Oncology</Checkbox>
                <Checkbox value="Radiology">Radiology</Checkbox>
                <Checkbox value="Rehabilitation">Rehabilitation</Checkbox>
                <Checkbox value="Surgery">Surgery</Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Counselor / Mental Health' ? (
            <Well>
              <h6 id="certificationsReq">Certifications</h6>
              <FormGroup
                controlId="certifications"
                onChange={e => this.handleMultipleChange(e, 'certifications')}
              >
                <ControlLabel>
                  Select applicable certifications or select "none" if not
                  certified<span className="required">*</span>
                </ControlLabel>
                <Checkbox value="Behavior Analyst Certi􏰀cation Board">
                  Behavior Analyst Certification Board
                </Checkbox>
                <Checkbox value="Licensed Clinical Social Worker">
                  Licensed Clinical Social Worker
                </Checkbox>
                <Checkbox value="Licensed Marriage and Family Therapist">
                  Licensed Marriage and Family Therapist
                </Checkbox>
                <Checkbox value="Licensed Master Social Worker">
                  Licensed Master Social Worker
                </Checkbox>
                <Checkbox value="Licensed Mental Health Counselor">
                  Licensed Mental Health Counselor
                </Checkbox>
                <Checkbox value="Licensed Professional Counselor">
                  Licensed Professional Counselor
                </Checkbox>
                <Checkbox
                  value="National Board for Certi􏰀ed Counselors
            "
                >
                  National Board for Certified Counselors
                </Checkbox>
                <Checkbox value="National Certi􏰀ed Counselor">
                  National Certified Counselor
                </Checkbox>
                <Checkbox value="None">None</Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Medical Care Provider' ? (
            <Well>
              <h6 id="certificationsReq">Certifications</h6>
              <FormGroup
                controlId="Certifications"
                onChange={e => this.handleMultipleChange(e, 'certifications')}
              >
                <ControlLabel>
                  Select applicable certifications or select "none" if not
                  certified<span className="required">*</span>
                </ControlLabel>
                <Checkbox value="American Board of Otolaryngology - Head and Neck Surgery">
                  American Board of Otolaryngology - Head and Neck Surgery
                </Checkbox>
                <Checkbox value="American Board of Pediatrics">
                  American Board of Pediatrics
                </Checkbox>
                <Checkbox value="American Board of Surgery">
                  American Board of Surgery
                </Checkbox>
                <Checkbox value="Pediatric Surgery Specialty Board">
                  Pediatric Surgery Specialty Board
                </Checkbox>
                <Checkbox value="Pediatric Nursing Certification Board">
                  Pediatric Nursing Certification Board
                </Checkbox>
                <Checkbox value="National Certification Board">
                  National Certification Board
                </Checkbox>
                <Checkbox
                  value="National Commission on Certification of Physician Assistants
            "
                >
                  National Commission on Certification of Physician Assistants
                </Checkbox>
                <Checkbox value="None">None</Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Counselor / Mental Health' ||
          listingCategory === 'Dietitian' ||
          listingCategory === 'Feeding Therapist' ? (
            <Well>
              <h6 id="agesServedReq">Ages Served</h6>
              <FormGroup
                controlId="agesServed"
                onChange={e => this.handleMultipleChange(e, 'agesServed')}
              >
                <ControlLabel>
                  Select all ages served that apply<span className="required">
                    *
                  </span>
                </ControlLabel>
                <Checkbox value="Infants: 0 - 12 months">
                  Infants: 0 - 12 months
                </Checkbox>
                <Checkbox value="Toddlers: 13 - 36 months">
                  Toddlers: 13 - 36 months
                </Checkbox>
                <Checkbox value="Preschool: 3 - 5 years">
                  Preschool: 3 - 5 years
                </Checkbox>
                <Checkbox value="School age: 5 - 12 years">
                  School age: 5 - 12 years
                </Checkbox>
                <Checkbox value="Adolescent: 13 - 21 years">
                  Adolescent: 13 - 21 years
                </Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Counselor / Mental Health' ||
          listingCategory === 'Dietitian' ||
          listingCategory === 'Feeding Therapist' ? (
            <Well>
              <h6 id="paymentTypesReq">Payment Types Accepted</h6>
              <FormGroup
                controlId="paymentTypes"
                onChange={e => this.handleMultipleChange(e, 'paymentTypes')}
              >
                <ControlLabel>
                  Select all payment types accepted<span className="required">
                    *
                  </span>
                </ControlLabel>
                <Checkbox value="Medicaid">Medicaid</Checkbox>
                <Checkbox value="Private insurance">Private insurance</Checkbox>
                <Checkbox value="Private pay">Private pay</Checkbox>
                <Checkbox value="Part C">Part C</Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Counselor / Mental Health' ? (
            <Well>
              <h6>Mental Health / Counseling Services</h6>
              <FormGroup
                controlId="mentalHealth"
                onChange={e => this.handleMultipleChange(e, 'mentalHealth')}
              >
                <ControlLabel>
                  Select all counseling services you provide
                </ControlLabel>
                <Checkbox value="Applied Behavior Analysis">
                  Applied Behavior Analysis
                </Checkbox>
                <Checkbox value="Child play therapy">
                  Child play therapy
                </Checkbox>
                <Checkbox value="Cognitive behavioral therapy">
                  Cognitive behavioral therapy
                </Checkbox>
                <Checkbox value="Family / marital counseling">
                  Family / marital counseling
                </Checkbox>
                <Checkbox value="General psychosocial and mental health support for families with special needs / medically fragile children and youth">
                  General psychosocial and mental health support for families
                  with special needs / medically fragile children and youth
                </Checkbox>
                <Checkbox value="Group therapy">Group therapy</Checkbox>
                <Checkbox value="Individual and family therap">
                  Individual and family therap
                </Checkbox>
                <Checkbox value="Parent counseling and support">
                  Parent counseling and support
                </Checkbox>
                <Checkbox value="Parent education / support groups">
                  Parent education / support groups
                </Checkbox>
                <Checkbox value="Sibling counseling">
                  Sibling counseling
                </Checkbox>
                <Checkbox value="Terminal illness / life-shortening conditions / grief work">
                  Terminal illness / life-shortening conditions / grief work
                </Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Counselor / Mental Health' ||
          listingCategory === 'Feeding Therapist' ? (
            <Well>
              <h6>
                Experience in Treating Children with These Medical Conditions
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
                <Checkbox value="Autism spectrum disorders">
                  Autism spectrum disorders
                </Checkbox>
                <Checkbox value="Cancer">Cancer</Checkbox>
                <Checkbox value="Craniofacial anomalies (including cleft lip and palate)">
                  Craniofacial anomalies (including cleft lip and palate)
                </Checkbox>
                <Checkbox value="Developmental delay">
                  Developmental delay
                </Checkbox>
                <Checkbox value="Gastroesophageal reflux disease (GERD)">
                  Gastroesophageal reflux disease (GERD)
                </Checkbox>
                <Checkbox value="GI issued (short gut syndrome, necrotizing enterocolitis, eosinophilic esophagitis, etc)">
                  GI issued (short gut syndrome, necrotizing enterocolitis,
                  eosinophilic esophagitis, etc)
                </Checkbox>
                <Checkbox value="Growth issues (FTT, poor weight gain)">
                  Growth issues (FTT, poor weight gain)
                </Checkbox>
                <Checkbox value="G-tube placement">G-tube placement</Checkbox>
                <Checkbox value="Heart defects">Heart defects</Checkbox>
                <Checkbox value="Medically fragile children">
                  Medically fragile children
                </Checkbox>
                <Checkbox value="Neurologic deficits (cerebral palsy, static encephalopathy, hydrocephalus, etc)">
                  Neurologic deficits (cerebral palsy, static encephalopathy,
                  hydrocephalus, etc)
                </Checkbox>
                <Checkbox value="NG/ND tube placement">
                  NG/ND tube placement
                </Checkbox>
                <Checkbox value="Premature infants">Premature infants</Checkbox>
                <Checkbox value="Pulmonary issues (chronic lung disease, reactive airway disease)">
                  Pulmonary issues (chronic lung disease, reactive airway
                  disease)
                </Checkbox>
                <Checkbox value="Spinal cord injury">
                  Spinal cord injury
                </Checkbox>
                <Checkbox value="Tracheotomy/ventilator dependent">
                  Tracheotomy/ventilator dependent
                </Checkbox>
                <Checkbox value="Traumatic brain injury">
                  Traumatic brain injury
                </Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Counselor / Mental Health' ||
          listingCategory === 'Feeding Therapist' ? (
            <Well>
              <h6>
                Experience in Treating Children with These Feeding Conditions
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
                <Checkbox value="Breastfeeding issues">
                  Breastfeeding issues
                </Checkbox>
                <Checkbox value="Difficulty transitioning to solids">
                  Difficulty transitioning to solids
                </Checkbox>
                <Checkbox value="Non-oral feeders (fed via NG, ND, g-tube, etc)">
                  Non-oral feeders (fed via NG, ND, g-tube, etc)
                </Checkbox>
                <Checkbox value="Oral aversion">Oral aversion</Checkbox>
                <Checkbox value="Oral sensory dysfunction">
                  Oral sensory dysfunction
                </Checkbox>
                <Checkbox value="Oral dyspraxia/apraxia">
                  Oral dyspraxia/apraxia
                </Checkbox>
                <Checkbox value="Psychosocial dysfunction related to feeding">
                  Psychosocial dysfunction related to feeding
                </Checkbox>
                <Checkbox value="Swallowing difficulty">
                  Swallowing difficulty
                </Checkbox>
                <Checkbox value="Tongue tie">Tongue tie</Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Dietitian' ? (
            <Well>
              <h6>Feeding Clinical Practice Secialties</h6>
              <FormGroup
                controlId="practiceSpecialties"
                onChange={e =>
                  this.handleMultipleChange(e, 'practiceSpecialties')
                }
              >
                <ControlLabel>
                  Select all practice areas related to feeding that apply
                </ControlLabel>
                <Checkbox value="Behavioral management">
                  Behavioral management
                </Checkbox>
                <Checkbox value="Blenderized diets">Blenderized diets</Checkbox>
                <Checkbox value="Breastfeeding management">
                  Breastfeeding management
                </Checkbox>
                <Checkbox value="Nutritional assessment and management">
                  Nutritional assessment and management
                </Checkbox>
                <Checkbox value="Weaning from feeding tubes">
                  Weaning from feeding tubes
                </Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Feeding Therapist' ? (
            <Well>
              <h6>Feeding Clinical Practice Secialties</h6>
              <FormGroup
                controlId="practiceSpecialties"
                onChange={e =>
                  this.handleMultipleChange(e, 'practiceSpecialties')
                }
              >
                <ControlLabel>
                  Select all practice areas related to feeding that apply
                </ControlLabel>
                <Checkbox value="Behavioral management">
                  Behavioral management
                </Checkbox>
                <Checkbox value="Blenderized diets">Blenderized diets</Checkbox>
                <Checkbox value="Breastfeeding management">
                  Breastfeeding management
                </Checkbox>
                <Checkbox value="clinical feeding and / or swallowing assessment">
                  clinical feeding and / or swallowing assessment
                </Checkbox>
                <Checkbox value="Craniosacral therapy">
                  Craniosacral therapy
                </Checkbox>
                <Checkbox value="E stim / Vital stim">
                  E stim / Vital stim
                </Checkbox>
                <Checkbox value="Feeding groups">Feeding groups</Checkbox>
                <Checkbox value="Fiberoptic endoscope evaluation of swallowing (FEES)">
                  Fiberoptic endoscope evaluation of swallowing (FEES)
                </Checkbox>
                <Checkbox value="Food texture advancement">
                  Food texture advancement
                </Checkbox>
                <Checkbox value="Kinesiotaping">Kinesiotaping</Checkbox>
                <Checkbox value="Manual therapy">Manual therapy</Checkbox>
                <Checkbox value="Nutritional assessment and management">
                  Nutritional assessment and management
                </Checkbox>
                <Checkbox value="Oral motor therapy">
                  Oral motor therapy
                </Checkbox>
                <Checkbox value="Psychosocial treatment">
                  Psychosocial treatment
                </Checkbox>
                <Checkbox value="Sensory processing related to feeding">
                  Sensory processing related to feeding
                </Checkbox>
                <Checkbox value="Videofluoroscopic swallowing studies (VFSS) / Modified barium swallows (MBS)">
                  Videofluoroscopic swallowing studies (VFSS) / Modified barium
                  swallows (MBS)
                </Checkbox>
                <Checkbox value="Weaning from feeding tubes">
                  Weaning from feeding tubes
                </Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Counselor / Mental Health' ||
          listingCategory === 'Dietitian' ||
          listingCategory === 'Feeding Therapist' ? (
            <Well>
              <h6>Years of Experience Related to Pediatric Feeding</h6>
              <FormGroup controlId="yearsExperience">
                <ControlLabel className="required">*</ControlLabel>
                <ControlLabel>Select one experience category</ControlLabel>
                <Radio
                  name="radioExperience"
                  value="0 - 5 years"
                  required
                  onChange={this.handleExperience}
                >
                  0 - 5 years
                </Radio>{' '}
                <Radio
                  name="radioExperience"
                  value="5 - 10 years"
                  onChange={this.handleExperience}
                >
                  5 - 10 years
                </Radio>{' '}
                <Radio
                  name="radioExperience"
                  value="10+ years"
                  onChange={this.handleExperience}
                >
                  10+ years
                </Radio>{' '}
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Medical Care Provider' ? (
            <Well>
              <h6>
                Experience Treating Patients with the Following Issues or
                Conditions
              </h6>
              <FormGroup
                controlId="medicalExperienceTreating"
                onChange={e =>
                  this.handleMultipleChange(e, 'medicalExperienceTreating')
                }
              >
                <ControlLabel>
                  Select all issues or conditions that apply
                </ControlLabel>
                <Checkbox value="Central lines for long-term total parenteral nutrition">
                  Central lines for long-term total parenteral nutrition
                </Checkbox>
                <Checkbox value="Food allergies">Food allergies</Checkbox>
                <Checkbox value="Gastrostomy tubes or other tube feedings">
                  Gastrostomy tubes or other tube feedings
                </Checkbox>
                <Checkbox value="Growth faltering">Growth faltering</Checkbox>
                <Checkbox value="History of genetic issues, birth defects, illnesses, surgeries affecting feeding and eating">
                  History of genetic issues, birth defects, illnesses, surgeries
                  affecting feeding and eating
                </Checkbox>
                <Checkbox value="Neurodevelopmental issues">
                  Neurodevelopmental issues
                </Checkbox>
                <Checkbox value="Sensory / behavioral feeding and eating challenges">
                  Sensory / behavioral feeding and eating challenges
                </Checkbox>
                <Checkbox value="Transition to oral feeding">
                  Transition to oral feeding
                </Checkbox>
              </FormGroup>
            </Well>
          ) : null}

          {listingCategory === 'Medical Care Provider' ? (
            <Well>
              <h6>Specific Education / Training on Pediatric Feeding</h6>
              <FormGroup controlId="medicalEducation1">
                <ControlLabel>
                  If none, this section will not display on your listing
                </ControlLabel>
                <br />
                <ControlLabel>1</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.medicalEducation1}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="medicalEducation2">
                <ControlLabel>2</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.medicalEducation2}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="medicalEducation3">
                <ControlLabel>3</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.medicalEducation3}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Well>
          ) : null}
          {listingCategory === 'Medical Care Provider' ? (
            <Well>
              <h6>
                Research / Publication / Presentations on Pediatric Feeding
              </h6>
              <FormGroup controlId="medicalResearch1">
                <ControlLabel>
                  If none, this section will not display on your listing
                </ControlLabel>
                <br />
                <ControlLabel>1</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.medicalResearch1}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="medicalResearch2">
                <ControlLabel>2</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.medicalResearch2}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="medicalResearch3">
                <ControlLabel>3</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.medicalResearch3}
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
              <Checkbox required onChange={this.handleTocChange}>
                I have read the terms and conditions and certify that the above
                data is accurate and true and that I have liability insurance. I
                understand that PedsFeeds.com is not liable for any consequences
                resulting from my feeding practice.
              </Checkbox>
            </FormGroup>
          </Well>
          <Well>
            <FormGroup controlId="file">
              <ControlLabel>Attach a photo less than 1MB in size</ControlLabel>
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>
          </Well>
          <ButtonToolbar>
            <LoaderButton
              block
              bsStyle="success"
              bsSize="large"
              type="submit"
              isLoading={this.state.isLoading}
              text="Submit"
              loadingText="Creating profile"
            />
            <Button bsStyle="primary" bsSize="large" active href="/profile">
              Cancel
            </Button>
          </ButtonToolbar>
        </Form>
      </div>
    )
  }
}
