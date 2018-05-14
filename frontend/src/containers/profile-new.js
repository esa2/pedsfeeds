import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { Form, FormGroup, FormControl, ControlLabel, Radio, Checkbox, Well } from 'react-bootstrap'
import LoaderButton from '../components/loader-button'
import '../styles/profile-new.css'

export default class ProfileNew extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleListingDisplay = this.handleListingDisplay.bind(this)
    this.handleDiscipline = this.handleDiscipline.bind(this)
    this.handleExperience = this.handleExperience.bind(this)

    this.state = {
      isLoading: null,
      approvedListing: false,
      lastName: '',
      firstName: '',
      middleInitial: '',
      displayListing: false,
      professionalDiscipline: '',
      licenseState: '',
      licenseStanding: false,
      licenseNumber: '',
      taxId: '',
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
      experience: '',
      toc: false
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value })
    console.log('state')
    console.log(this.state)
  }

  handleListingDisplay() {
    this.setState({ displayListing: !this.state.displayListing })
  }

  handleDiscipline(e) {
    this.setState({ professionalDiscipline: e.target.value })
  }

  handleExperience(e) {
    this.setState({ experience: e.target.value })
  }

  handleLicenseChange = () => {
    this.setState({
      licenseStanding: !this.state.licenseStanding
    })
  }

  handleTocChange = () => {
    this.setState({
      toc: !this.state.toc
    })
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
    
  handleSubmit = async e => {
    e.preventDefault()
    this.setState({ isLoading: true })
    try {
      await this.createProfile({
        approvedListing: this.state.approvedListing,
        lastName: this.state.lastName,
        firstName: this.state.firstName,
        middleInitial: this.state.middleInitial !== '' ? this.state.middleInitial : false,
        displayListing: this.state.displayListing,
        professionalDiscipline: this.state.professionalDiscipline,
        licenseState: this.state.licenseState,
        licenseStanding: this.state.licenseStanding,
        licenseNumber: this.state.licenseNumber,
        taxId: this.state.taxId !== '' ? this.state.taxId : false,
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
        providerGroup: this.state.providerGroup !== '' ? this.state.providerGroup  : false,
        providerGroupText: this.state.providerGroupText !== '' ? this.state.providerGroupText : false,
        workSetting: this.state.workSetting,
        agesServed: this.state.agesServed,
        paymentTypes: this.state.paymentTypes,
        medicalConditions: this.state.medicalConditions,
        feedingConditions: this.state.feedingConditions,
        practiceSpecialties: this.state.practiceSpecialties,
        experience: this.state.experience,
        toc: this.state.toc

      })
      this.props.history.push('/profile')
    } catch (error) {
      alert(error)
      this.setState({ isLoading: false })
    }
  }

  createProfile(profile) {
    return API.post('peds', '/profile-new', {
      body: profile
    })
  }

  render() {
    return (
      <div>
        <p>Required fields<span className="required">*</span></p>
        <Form onSubmit={this.handleSubmit}>
          <Well>
          <h6>Name</h6>
          <FormGroup controlId="lastName">
            <ControlLabel className="required">*</ControlLabel>
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              autoFocus
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
          <FormGroup controlId="middleInitial">
            <ControlLabel>Middle Initial</ControlLabel>
            <FormControl
              type="text"
              value={this.state.middleInitial}
              maxLength = "1"
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
              onChange={this.handleListingDisplay}>
              No thanks please keep it private
            </Radio>{' '}
            <Radio
              name="radioDisplay"
              onChange={this.handleListingDisplay}>
              Yes display my profile
            </Radio>{' '}
          </FormGroup>
        </Well>
        <Well>
          <h6>Professional Discipline</h6>
          <FormGroup controlId="professionalDiscipline">
            <ControlLabel className="required">*</ControlLabel>
            <ControlLabel>Select one Discipline</ControlLabel>
            <Radio
              name="radioDiscipline"
              value="Occupational Therapist"
              required
              onChange={this.handleDiscipline}>
              Occupational Therapist
            </Radio>{' '}
            <Radio name="radioDiscipline"
              value="Behavioral / Clinical Child Psychologist"
              onChange={this.handleDiscipline}>
              Behavioral / Clinical Child Psychologist
            </Radio>{' '}
            <Radio name="radioDiscipline"
              value="Physical Therapist"
              onChange={this.handleDiscipline}>
              Physical Therapist
            </Radio>{' '}
            <Radio name="radioDiscipline"
              value="Speech Language Pathologist"
              onChange={this.handleDiscipline}>
              Speech Language Pathologist
            </Radio>{' '}
          </FormGroup>
        </Well>
        <Well>
          <h6>Licensure</h6>
          <FormGroup controlId="licenseState">
            <ControlLabel className="required">*</ControlLabel>
            <ControlLabel>State</ControlLabel>
            <FormControl componentClass="select"
              required
              value={this.state.licenseState}
              onChange={this.handleChange}>
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
            <ControlLabel><span className="required">*</span>Enter your state license number (state credential number for WA state). This field is used to validate your credentials. It is treated with confidentiality and will not be displayed in your profile.</ControlLabel>
            <FormControl
              type="text"
              required
              value={this.state.licenseNumber}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="licenseStanding">
            <Well>
              <ControlLabel className="required">*</ControlLabel>
              <ControlLabel>Check standing</ControlLabel>
              <Checkbox
                onChange={this.handleLicenseChange}>
              I am in good standing with the state and national liscensing or certification bodies required for my profession
              </Checkbox>
            </Well>
          </FormGroup>
          <FormGroup controlId="taxId">
            <ControlLabel>Tax ID</ControlLabel>
            <FormControl
              type="text"
              value={this.state.taxId}
              onChange={this.handleChange}
            />
          </FormGroup>
       </Well>
       <Well>
        <h6>Place of Employment</h6>
        <FormGroup controlId="empOrganization">
          <ControlLabel className="required">*</ControlLabel>
          <ControlLabel>Organization / Company</ControlLabel>
          <FormControl
            type="text"
            value={this.state.empOrganization}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="empUrl">
          <ControlLabel>Employers Website</ControlLabel>
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
              type="text"
              value={this.state.workCity}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="workState">
            <ControlLabel className="required">*</ControlLabel>
            <ControlLabel>State</ControlLabel>
            <FormControl componentClass="select"
              required
              value={this.state.workState}
              onChange={this.handleChange}>
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
            <ControlLabel>Zip</ControlLabel>
            <FormControl
              type="text"
              value={this.state.workZip}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="workPhone">
          <ControlLabel className="required">*</ControlLabel>
            <ControlLabel>Appointment Scheduling Phone Number</ControlLabel>
            <FormControl
              type="phone"
              value={this.state.workPhone}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="workExtension">
            <ControlLabel>Extension</ControlLabel>
            <FormControl
              type="text"
              placeholder="Extension digits only"
              value={this.state.workExtension}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="workEmail">
            <ControlLabel>Email - complete this field if you wish families or providers to contact you via email</ControlLabel>
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
            <ControlLabel></ControlLabel>
            <FormControl componentClass="select"
              required
              value={this.state.providerGroup}
              onChange={this.handleChange}>
              <option value="">-- Select Provider Group --</option>
              <option value="Boyer Children's Clinic (WA)">Boyer Children's Clinic (WA)</option>
              <option value="Cildren's Therapy Center of Kent (WA)">Cildren's Therapy Center of Kent (WA)</option>
              <option value="Children's Therapy Center of Woodinville (WA)">Children's Therapy Center of Woodinville (WA)</option>
              <option value="Mosaic Center for Therapy Services (WA)">Mosaic Center for Therapy Services (WA)</option>
              <option value="Northwest Center (WA)">Northwest Center (WA)</option>
              <option value="Pediatric Speech and Language Therapy (WA)">Pediatric Speech and Language Therapy (WA)</option>
              <option value="Private practice">Private practice</option>
              <option value="Seattle CHilden's Hospital (WA)">Seattle Children's Hospital (WA)</option>
              <option value="Swedish Hospital (WA)">Swedish Hospital (WA)</option>
              <option value="University of Washington (WA)">University of Washington (WA)</option>
              <option value="Valley Medical Center (WA)">Valley Medical Center (WA)</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="providerGroupText">
            <ControlLabel>Enter provider group if not found in the above select list</ControlLabel>
            <FormControl
              type="text"
              value={this.state.providerGroupText}
              onChange={this.handleChange}
            />
          </FormGroup>
        </Well>
        <Well>
          <h6>Work Setting</h6>
          <FormGroup controlId="workSetting" onChange={e => this.handleMultipleChange(e, 'workSetting')}>
            <ControlLabel>Select all work settings that apply<span className="required">*</span></ControlLabel>
            <Checkbox value="Center-based services">Center-based services</Checkbox>
            <Checkbox value="Early Intervention program">Early Intervention program</Checkbox>
            <Checkbox value="Home-based services">Home-based services</Checkbox>
            <Checkbox value="Hospital inpatient">Hospital inpatient</Checkbox>
            <Checkbox value="Hospital outpatient">Hospital outpatient</Checkbox>
            <Checkbox value="Private practice">Private practice</Checkbox>
            <Checkbox value="School based">School based</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Ages Served</h6>
          <FormGroup controlId="agesServed" onChange={e => this.handleMultipleChange(e, 'agesServed')}>
            <ControlLabel>Select all ages served that apply<span className="required">*</span></ControlLabel>
            <Checkbox value="Infants: 0 - 12 months">Infants: 0 - 12 months</Checkbox>
            <Checkbox value="Toddlers: 13 - 36 months">Toddlers: 13 - 36 months</Checkbox>
            <Checkbox value="Preschool: 3 - 5 years">Preschool: 3 - 5 years</Checkbox>
            <Checkbox value="School age: 5 - 12 years">School age: 5 - 12 years</Checkbox>
            <Checkbox value="Adolescent: 13 - 21 years">Adolescent: 13 - 21 years</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Payment Types Accepted</h6>
          <FormGroup controlId="paymentTypes" onChange={e => this.handleMultipleChange(e, 'paymentTypes')}>
            <ControlLabel>Select all payment types accepted<span className="required">*</span></ControlLabel>
            <Checkbox value="Medicaid">Medicaid</Checkbox>
            <Checkbox value="Private insurance">Private insurance</Checkbox>
            <Checkbox value="Private pay">Private pay</Checkbox>
            <Checkbox value="Part C">Part C</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Experience in Treating Children with These Medical Conditions</h6>
          <FormGroup controlId="medicalConditions" onChange={e => this.handleMultipleChange(e, 'medicalConditions')}>
            <ControlLabel>Select all medical conditions you treat</ControlLabel>
            <Checkbox value="Autism spectrum disorders">Autism spectrum disorders</Checkbox>
            <Checkbox value="Cancer">Cancer</Checkbox>
            <Checkbox value="Craniofacial anomalies (including cleft lip and palate)">Craniofacial anomalies (including cleft lip and palate)</Checkbox>
            <Checkbox value="Developmental delay">Developmental delay</Checkbox>
            <Checkbox value="Gastroesophageal reflux disease (GERD)">Gastroesophageal reflux disease (GERD)</Checkbox>
            <Checkbox value="GI issued (short gut syndrome, necrotizing enterocolitis, eosinophilic esophagitis, etc)">GI issued (short gut syndrome, necrotizing enterocolitis, eosinophilic esophagitis, etc)</Checkbox>
            <Checkbox value="Growth issues (FTT, poor weight gain)">Growth issues (FTT, poor weight gain)</Checkbox>
            <Checkbox value="G-tube placement">G-tube placement</Checkbox>
            <Checkbox value="Heart defects">Heart defects</Checkbox>
            <Checkbox value="Medically fragile children">Medically fragile children</Checkbox>
            <Checkbox value="Neurologic deficits (cerebral palsy, static encephalopathy, hydrocephalus, etc)">Neurologic deficits (cerebral palsy, static encephalopathy, hydrocephalus, etc)</Checkbox>
            <Checkbox value=">NG/ND tube placement">NG/ND tube placement</Checkbox>
            <Checkbox value="Premature infants">Premature infants</Checkbox>
            <Checkbox value="Pulmonary issues (chronic lung disease, reactive airway disease)">Pulmonary issues (chronic lung disease, reactive airway disease)</Checkbox>
            <Checkbox value="Spinal cord injury">Spinal cord injury</Checkbox>
            <Checkbox value="Tracheotomy/ventilator dependent">Tracheotomy/ventilator dependent</Checkbox>
            <Checkbox value="Traumatic brain injury">Traumatic brain injury</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Experience in Treating Children with These Feeding Conditions</h6>
          <FormGroup controlId="feedingConditions" onChange={e => this.handleMultipleChange(e, 'feedingConditions')}>
            <ControlLabel>Select all feeding conditions of children you treat</ControlLabel>
            <Checkbox value="Breastfeeding issues">Breastfeeding issues</Checkbox>
            <Checkbox value="Difficulty transitioning to solids">Difficulty transitioning to solids</Checkbox>
            <Checkbox value="Non-oral feeders (fed via NG, ND, g-tube, etc)">Non-oral feeders (fed via NG, ND, g-tube, etc)</Checkbox>
            <Checkbox value="Oral aversion">Oral aversion</Checkbox>
            <Checkbox value="Oral sensory dysfunction">Oral sensory dysfunction</Checkbox>
            <Checkbox value="Oral dyspraxia/apraxia">Oral dyspraxia/apraxia</Checkbox>
            <Checkbox value="Psychosocial dysfunction related to feeding">Psychosocial dysfunction related to feeding</Checkbox>
            <Checkbox value="Swallowing difficulty">Swallowing difficulty</Checkbox>
            <Checkbox value="Tongue tie">Tongue tie</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Feeding Clinical Practice Secialties</h6>
          <FormGroup controlId="practiceSpecialties" onChange={e => this.handleMultipleChange(e, 'practiceSpecialties')}>
            <ControlLabel>Select all practice areas related to feeding that apply</ControlLabel>
            <Checkbox value="Behavioral management">Behavioral management</Checkbox>
            <Checkbox value="Blenderized diets">Blenderized diets</Checkbox>
            <Checkbox value="Breastfeeding management">Breastfeeding management</Checkbox>
            <Checkbox value="clinical feeding and / or swallowing assessment">clinical feeding and / or swallowing assessment</Checkbox>
            <Checkbox value="Craniosacral therapy">Craniosacral therapy</Checkbox>
            <Checkbox value="E stim / Vital stim">E stim / Vital stim</Checkbox>
            <Checkbox value="Feeding groups">Feeding groups</Checkbox>
            <Checkbox value="Fiberoptic endoscope evaluation of swallowing (FEES)">Fiberoptic endoscope evaluation of swallowing (FEES)</Checkbox>
            <Checkbox value="Food texture advancement">Food texture advancement</Checkbox>
            <Checkbox value="Kinesiotaping">Kinesiotaping</Checkbox>
            <Checkbox value="Manual therapy">Manual therapy</Checkbox>
            <Checkbox value="Nutritional assessment and management">Nutritional assessment and management</Checkbox>
            <Checkbox value="Oral motor therapy">Oral motor therapy</Checkbox>
            <Checkbox value="Psychosocial treatment">Psychosocial treatment</Checkbox>
            <Checkbox value="Sensory processing related to feeding">Sensory processing related to feeding</Checkbox>
            <Checkbox value="Videofluoroscopic swallowing studies (VFSS) / Modified barium swallows (MBS)">Videofluoroscopic swallowing studies (VFSS) / Modified barium swallows (MBS)</Checkbox>
            <Checkbox value="Weaning from feeding tubes">Weaning from feeding tubes</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Years of Experience Related to Pediatric Feeding</h6>
          <FormGroup controlId="experience">
            <ControlLabel className="required">*</ControlLabel>
            <ControlLabel>Select one experience category</ControlLabel>
            <Radio
              name="radioExperience"
              value="0 - 5 years"
              required
              onChange={this.handleExperience}>
              0 - 5 years
            </Radio>{' '}
            <Radio name="radioExperience"
              value="5 - 10 years"
              onChange={this.handleExperience}>
              5 - 10 years
            </Radio>{' '}
            <Radio name="radioExperience"
              value="10+ years"
              onChange={this.handleExperience}>
              10+ years
            </Radio>{' '}
          </FormGroup>
        </Well>
        <Well>
          <FormGroup controlId="toc">
          <ControlLabel>Terms and Conditions<span className="required">*</span></ControlLabel>
          <Checkbox
              onChange={this.handleTocChange}>
              I have read the terms and conditions and certify that the above data is accurate and true and that I have liability insurance. I understand that PedsFeeds.com is not liable for any consequences resulting from my feeding practice.
              </Checkbox>
            </FormGroup>
          </Well>
        <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </Form>
      </div>
    )
  }
}
