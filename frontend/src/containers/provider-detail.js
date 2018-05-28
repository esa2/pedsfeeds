import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

export default class ProviderDetail extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
  }
  render() {
    return (
      <div>
        <Grid className="detail-page">
          <Row>
            <Col md={9}>
              <br /><br /><br /><br /><br />
              <h6 className="detail-title">{this.props.value.listingTitle}</h6>
            </Col>

            <Col md={3}>
              {this.props.value.attachment === null ? null : (
                <img
                  width='auto'
                  height={120}
                  src={`https://s3-us-west-2.amazonaws.com/pedsfeeds/images/profile/${
                    this.props.value.attachment
                  }`}
                  alt="thumbnail"
                />
              )}
            </Col>
          </Row>

          <hr className="detail-title-underscore" />
          <p className="detail-heading">PROFESSIONAL DISCIPLINE</p>
          <p className="detail-text">
            {this.props.value.professionalDiscipline}
          </p>
          <hr />

          <p className="detail-heading">PLACE OF EMPLOYMENT</p>
          <Row>
            <Col className="detail-label" md={3}>
              Organization / Company
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.value.empOrganization}
            </Col>
          </Row>
          {this.props.value.empUrl === false ? null : (
            <Row>
              <Col className="detail-label" md={3}>
                Employer's Website
              </Col>
              <Col md={9}>
                <a className="detail-text" href={`${this.props.value.empUrl}`}>
                  {this.props.value.empUrl}
                </a>
              </Col>
            </Row>
          )}
          <hr />

          <p className="detail-heading">WORK CONTACT INFORMATION</p>
          <Row>
            <Col className="detail-label" md={3}>
              Address
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.value.workAddress1}
            </Col>
          </Row>
          {this.props.value.workAddress2 === false ? null : (
            <Row>
              <Col className="detail-label" md={3} />
              <Col className="detail-text" md={9}>
                {this.props.value.workAddress2}
              </Col>
            </Row>
          )}
          <Row>
            <Col className="detail-label" md={3}>
              City
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.value.workCity}
            </Col>
          </Row>
          <Row>
            <Col className="detail-label" md={3}>
              State
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.value.workState}
            </Col>
          </Row>
          <Row>
            <Col className="detail-label" md={3}>
              Zip Code
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.value.workZip}
            </Col>
          </Row>
          <Row>
            <Col className="detail-label" md={3}>
              Phone
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.value.workPhone}
            </Col>
          </Row>
          {this.props.value.workExtension === false ? null : (
            <Row>
              <Col className="detail-label" md={3}>
                Extension
              </Col>
              <Col className="detail-text" md={9}>
                {this.props.value.workExtension}
              </Col>
            </Row>
          )}
          {this.props.value.workEmail === false ? null : (
            <Row>
              <Col className="detail-label" md={3}>
                Email
              </Col>
              <Col className="detail-text" md={9}>
                {this.props.value.workEmail}
              </Col>
            </Row>
          )}
          <hr />

          {this.props.value.providerGroup === false && this.props.value.providerGroupText === false ? null : (


            <div>
              <p className="detail-heading">PROVIDER GROUP</p>

              {this.props.value.providerGroup === false ? null : (
                <p className="detail-text">{this.props.value.providerGroup}</p>
              )}


              {this.props.value.providerGroupText === false ? null : (
                <p className="detail-text">{this.props.value.providerGroupText}</p>
              )}

              <hr />
            </div>
          )}

          <p className="detail-heading">WORK SETTING</p>
          {this.props.value.workSetting.map((ele, i) => (
            <li key={i}>{ele}</li>
          ))}
          <hr />

          {/* {this.props.value.certifications.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                CERTIFICATIONS
              </p>
              {this.props.value.certifications.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )} */}

          {this.props.value.agesServed.length === 0 ? null : (
            <div>
              <p className="detail-heading">AGES SERVED</p>
              {this.props.value.agesServed.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.value.paymentTypes.length === 0 ? null : (
            <div>
              <p className="detail-heading">PAYMENT TYPES ACCEPTED</p>
              {this.props.value.paymentTypes.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.value.mentalHealth.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                MENTAL HEALTH / COUNSELING SERVICES
              </p>
              {this.props.value.mentalHealth.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.value.medicalConditions.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                EXPERIENCE IN TREATING CHILDREN WITH THESE MEDICAL CONDITIONS
              </p>
              {this.props.value.medicalConditions.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.value.feedingConditions.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                EXPERIENCE IN TREATING CHILDREN WITH THESE FEEDING CONDITIONS
              </p>
              {this.props.value.feedingConditions.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.value.practiceSpecialties.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                FEEDING CLINICAL PRACTICE SPECIALTIES </p>
              {this.props.value.practiceSpecialties.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.value.medicalSpecialty.length === 0 ? null : (
            <div>
              <p className="detail-heading">SPECIALTY</p>
              {this.props.value.medicalSpecialty.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.value.medicalExperienceTreating.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                EXPERIENCE TREATING PATIENTS WITH THE FOLLOWING ISSUES OR
                CONDITIONS
              </p>
              {this.props.value.medicalExperienceTreating.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}

              <hr />
            </div>
          )}

          {this.props.value.yearsExperience === false ? null : (
            <div>
              <p className="detail-heading">YEARS OF EXPERIENCE RELATED TO PEDIATRIC FEEDING</p>
              <p className="detail-text">{this.props.value.yearsExperience}</p>
              <hr />
            </div>
          )}

          {this.props.value.medicalEducation1 === false ? null : (
            <div>
              <p className="detail-heading">SPECIFIC EDUCATION / TRAINING ON PEDIATRIC FEEDING</p>
              <p className="detail-text">{this.props.value.medicalEducation1}</p>
              {this.props.value.medicalMedical2 === false ? null : (
                <p className="detail-text">{this.props.value.medicalMedical2}</p>
              )}
              {this.props.value.medicalMedical3 === false ? null : (
                <p className="detail-text">{this.props.value.medicalMedical3}</p>
              )}
              <hr />
            </div>
          )}

          {this.props.value.medicalResearch1 === false ? null : (
            <div>
              <p className="detail-heading">RESEARCH / PUBLICATION / PRESENTATIONS ON PEDIATRIC FEEDING</p>
              <p className="detail-text">{this.props.value.medicalResearch1}</p>
              {this.props.value.medicalResearch2 === false ? null : (
                <p className="detail-text">{this.props.value.medicalResearch2}</p>
              )}
              {this.props.value.medicalResearch3 === false ? null : (
                <p className="detail-text">{this.props.value.medicalResearch3}</p>
              )}
              <hr />
            </div>
          )}

        </Grid>
      </div>
    )
  }
}
