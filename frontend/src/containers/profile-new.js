import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Radio, Checkbox, Well } from 'react-bootstrap'
import LoaderButton from '../components/loader-button'
import '../styles/profile-new.css'

export default class ProfileNew extends Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleRadioDisplay = this.handleRadioDisplay.bind(this)
    this.handleDiscipline = this.handleDiscipline.bind(this)

    this.state = {
      isLoading: null,
      lastName: '',
      firstName: '',
      middleInitial: '',
      displayListing: false,
      professionalDiscipline: '',
    }
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value })
    console.log('state')
    console.log(this.state)
  }

  handleRadioDisplay() {
    this.setState({ displayListing: !this.state.displayListing })
  }

  handleDiscipline(e) {
    this.setState({ professionalDiscipline: e.target.value })
  }

  render() {
    return (
      <div>
        <p>Required fields<span className="required">*</span></p>
        <Form>
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
              onChange={this.handleRadioDisplay}>
              No thanks please keep it private
            </Radio>{' '}
            <Radio
              name="radioDisplay"
              onChange={this.handleRadioDisplay}>
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
            <ControlLabel><span className="required">*</span>Enter your state license number (state credential number for WA state). This field is used to validate your credentials. It is treated with confidentiality and will not be displayed in your profile.</ControlLabel>
            <FormControl
              type="text"
              value={this.state.licenseNumber}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="licenseStanding">
            <Well>
              <ControlLabel className="required">*</ControlLabel>
              <ControlLabel>Check standing</ControlLabel>
              <Checkbox readOnly
                checked={this.state.multiDay}
                onChange={this.handleCheckboxChange}>
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
        <FormGroup controlId="organization">
          <ControlLabel className="required">*</ControlLabel>
          <ControlLabel>Organization / Company</ControlLabel>
          <FormControl
            type="text"
            value={this.state.organization}
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
              placeholder=""
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
            <FormControl componentClass="select">
              <option value="">-- Select Provider Group --</option>
              <option value="Boyer Children's Clinic (WA)">Boyer Children's Clinic (WA)</option>
              <option value="Cildren's Therapy Center of Kent (WA)">Cildren's Therapy Center of Kent (WA)</option>
              <option value="Children's Therapt Center of Woodinville (WA)">Children's Therapy Center of Woodinville (WA)</option>
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
          <FormGroup controlId="providerGroup">
            <ControlLabel>Enter provider group if not found in the above select list</ControlLabel>
            <FormControl
              type="text"
              value={this.state.providerGroup}
              onChange={this.handleChange}
            />
          </FormGroup>
        </Well>
        <Well>
          <h6>Work Setting</h6>
          <FormGroup controlId="workSetting">
            <ControlLabel>Select all work settings that apply<span className="required">*</span></ControlLabel>
            <Checkbox>Center-based services</Checkbox>
            <Checkbox>Early Intervention program</Checkbox>
            <Checkbox>Home-based services</Checkbox>
            <Checkbox>Hospital inpatient</Checkbox>
            <Checkbox>Hospital outpatient</Checkbox>
            <Checkbox>Private practice</Checkbox>
            <Checkbox>School based</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Ages Served</h6>
          <FormGroup controlId="agesServed">
            <ControlLabel>Select all ages served that apply<span className="required">*</span></ControlLabel>
            <Checkbox>Infants: 0 - 12 months</Checkbox>
            <Checkbox>Toddlers: 13 - 36 months</Checkbox>
            <Checkbox>Preschool: 3 - 5 years</Checkbox>
            <Checkbox>School age: 5 - 12 years</Checkbox>
            <Checkbox>Adolescent: 13 - 21 years</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Payment Types Accepted</h6>
          <FormGroup controlId="payments">
            <ControlLabel>Select all payment types accepted<span className="required">*</span></ControlLabel>
            <Checkbox>Medicaid</Checkbox>
            <Checkbox>Private insurance</Checkbox>
            <Checkbox>Private pay</Checkbox>
            <Checkbox>Part C</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Experience in Treating Children with These Medical Conditions</h6>
          <FormGroup controlId="">
            <ControlLabel>Select all medical conditions you treat</ControlLabel>
            <Checkbox>Autism spectrum disorders</Checkbox>
            <Checkbox>Cancer</Checkbox>
            <Checkbox>Craniofacial anomalies (including cleft lip and palate)</Checkbox>
            <Checkbox>Developmental delay</Checkbox>
            <Checkbox>Gastroesophageal reflux disease (GERD)</Checkbox>
            <Checkbox>GI issued (short gut syndrome, necrotizing enterocolitis, eosinophilic esophagitis, etc)</Checkbox>
            <Checkbox>Growth issues (FTT, poor weight gain)</Checkbox>
            <Checkbox>G-tube placement</Checkbox>
            <Checkbox>Heart defects</Checkbox>
            <Checkbox>Medically fragile children</Checkbox>
            <Checkbox>Neurologic deficits (cerebral palsy, static encephalopathy, hydrocephalus, etc)</Checkbox>
            <Checkbox>NG/ND tube placement</Checkbox>
            <Checkbox>Premature infants</Checkbox>
            <Checkbox>Pulmonary issues (chronic lung disease, reactive airway disease)</Checkbox>
            <Checkbox>Spinal cord injury</Checkbox>
            <Checkbox>Tracheotomy/ventilator dependent</Checkbox>
            <Checkbox>Traumatic brain injury</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Experience in Treating Children with These Feeding Conditions</h6>
          <FormGroup controlId="">
            <ControlLabel>Select all feeding conditions of children you treat</ControlLabel>
            <Checkbox>Breastfeeding issues</Checkbox>
            <Checkbox>Difficulty transitioning to solids</Checkbox>
            <Checkbox>Non-oral feeders (fed via NG, ND, g-tube, etc)</Checkbox>
            <Checkbox>Oral aversion</Checkbox>
            <Checkbox>Oral sensory dysfunction</Checkbox>
            <Checkbox>Oral dyspraxia/apraxia</Checkbox>
            <Checkbox>Psychosocial dysfunction related to feeding</Checkbox>
            <Checkbox>Swallowing difficulty</Checkbox>
            <Checkbox>Tongue tie</Checkbox>
            
          </FormGroup>
        </Well>
        <Well>
          <h6>Feeding Clinical Practice Secialties</h6>
          <FormGroup controlId="">
            <ControlLabel>Select all practice areas related to feeding that apply</ControlLabel>
            <Checkbox>Behavioral management</Checkbox>
            <Checkbox>Blenderized diets</Checkbox>
            <Checkbox>Breastfeeding management</Checkbox>
            <Checkbox>clinical feeding and / or swallowing assessment</Checkbox>
            <Checkbox>Craniosacral therapy</Checkbox>
            <Checkbox>E stim / Vital stim</Checkbox>
            <Checkbox>Feeding groups</Checkbox>
            <Checkbox>Fiberoptic endoscope evaluation of swallowing (FEES)</Checkbox>
            <Checkbox>Food texture advancement</Checkbox>
            <Checkbox>Kinesiotaping</Checkbox>
            <Checkbox>Manual therapy</Checkbox>
            <Checkbox>Nutritional assessment and management</Checkbox>
            <Checkbox>Oral motor therapy</Checkbox>
            <Checkbox>Psychosocial treatment</Checkbox>
            <Checkbox>Sensory processing related to feeding</Checkbox>
            <Checkbox>Videofluoroscopic swallowing studies (VFSS) / Modified barium swallows (MBS)</Checkbox>
            <Checkbox>Weaning from feeding tubes</Checkbox>
          </FormGroup>
        </Well>
        <Well>
          <h6>Years of Experience Related to Pediatric Feeding</h6>
          <FormGroup controlId="professionalDiscipline">
            <ControlLabel className="required">*</ControlLabel>
            <ControlLabel>Select one experience category</ControlLabel>
            <Radio
              name="radioExperience"
              value="0 - 5 years"
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
            <Checkbox readOnly
              checked={this.state.toc}
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
