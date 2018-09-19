import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

export default class ProviderDetail extends Component {
  componentDidMount() {
    const heading = document.getElementById('scroll-point')
    heading.scrollIntoView({behavior: 'smooth', block: 'start'})
  }
  render() {
    return (
      <div>
        <Grid className="detail-page" id="scroll-point">
          <Row>
            <Col md={9}>
              <br /><br /><br /><br /><br />
              <h6 className="detail-title">{this.props.currentProvider.listingTitle}</h6>
            </Col>

            <Col md={3}>
              {this.props.currentProvider.attachment === null ? null : (
                <img
                  width='auto'
                  height={120}
                  src={`https://s3-us-west-2.amazonaws.com/pedsfeeds/images/profile/${
                    this.props.currentProvider.attachment
                  }`}
                  alt="thumbnail"
                />
              )}
            </Col>
          </Row>

          <hr className="detail-title-underscore" />
          <p className="detail-heading">PROFESSIONAL DISCIPLINE</p>
          <p className="detail-text">
            {this.props.currentProvider.professionalDiscipline}
          </p>
          <hr />

          <p className="detail-heading">PLACE OF EMPLOYMENT</p>
          <Row>
            <Col className="detail-label" md={3}>
              Organization / Company
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.currentProvider.empOrganization}
            </Col>
          </Row>
          {this.props.currentProvider.empUrl === false ? null : (
            <Row>
              <Col className="detail-label" md={3}>
                Employer's Website
              </Col>
              <Col md={9}>
                <a className="detail-text" href={`${this.props.currentProvider.empUrl}`}>
                  {this.props.currentProvider.empUrl}
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
              {this.props.currentProvider.workAddress1}
            </Col>
          </Row>
          {this.props.currentProvider.workAddress2 === false ? null : (
            <Row>
              <Col className="detail-label" md={3} />
              <Col className="detail-text" md={9}>
                {this.props.currentProvider.workAddress2}
              </Col>
            </Row>
          )}
          <Row>
            <Col className="detail-label" md={3}>
              City
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.currentProvider.workCity}
            </Col>
          </Row>
          <Row>
            <Col className="detail-label" md={3}>
              State
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.currentProvider.workState}
            </Col>
          </Row>
          <Row>
            <Col className="detail-label" md={3}>
              Zip Code
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.currentProvider.workZip}
            </Col>
          </Row>
          <Row>
            <Col className="detail-label" md={3}>
              Phone
            </Col>
            <Col className="detail-text" md={9}>
              {this.props.currentProvider.workPhone}
            </Col>
          </Row>
          {this.props.currentProvider.workExtension === false ? null : (
            <Row>
              <Col className="detail-label" md={3}>
                Extension
              </Col>
              <Col className="detail-text" md={9}>
                {this.props.currentProvider.workExtension}
              </Col>
            </Row>
          )}
          {this.props.currentProvider.workEmail === false ? null : (
            <Row>
              <Col className="detail-label" md={3}>
                Email
              </Col>
              <Col className="detail-text" md={9}>
                {this.props.currentProvider.workEmail}
              </Col>
            </Row>
          )}
          <hr />

          {this.props.currentProvider.providerGroup === false && this.props.currentProvider.providerGroupText === false ? null : (


            <div>
              <p className="detail-heading">PROVIDER GROUP</p>

              {this.props.currentProvider.providerGroup === false ? null : (
                <p className="detail-text">{this.props.currentProvider.providerGroup}</p>
              )}


              {this.props.currentProvider.providerGroupText === false ? null : (
                <p className="detail-text">{this.props.currentProvider.providerGroupText}</p>
              )}

              <hr />
            </div>
          )}

          <p className="detail-heading">WORK SETTING</p>
          {this.props.currentProvider.workSetting.map((ele, i) => (
            <li key={i}>{ele}</li>
          ))}
          <hr />

          {this.props.currentProvider.agesServed.length === 0 ? null : (
            <div>
              <p className="detail-heading">AGES SERVED</p>
              {this.props.currentProvider.agesServed.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.currentProvider.paymentTypes.length === 0 ? null : (
            <div>
              <p className="detail-heading">PAYMENT TYPES ACCEPTED</p>
              {this.props.currentProvider.paymentTypes.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.currentProvider.mentalHealth.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                MENTAL HEALTH / COUNSELING SERVICES
              </p>
              {this.props.currentProvider.mentalHealth.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.currentProvider.medicalConditions.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                EXPERIENCE IN TREATING CHILDREN WITH THESE MEDICAL CONDITIONS
              </p>
              {this.props.currentProvider.medicalConditions.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.currentProvider.feedingConditions.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                EXPERIENCE IN TREATING CHILDREN WITH THESE FEEDING CONDITIONS
              </p>
              {this.props.currentProvider.feedingConditions.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.currentProvider.practiceSpecialties.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                FEEDING CLINICAL PRACTICE SPECIALTIES </p>
              {this.props.currentProvider.practiceSpecialties.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.currentProvider.medicalSpecialty.length === 0 ? null : (
            <div>
              <p className="detail-heading">SPECIALTY</p>
              {this.props.currentProvider.medicalSpecialty.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}
              <hr />
            </div>
          )}

          {this.props.currentProvider.medicalExperienceTreating.length === 0 ? null : (
            <div>
              <p className="detail-heading">
                EXPERIENCE TREATING PATIENTS WITH THE FOLLOWING ISSUES OR
                CONDITIONS
              </p>
              {this.props.currentProvider.medicalExperienceTreating.map((ele, i) => (
                <li key={i}>{ele}</li>
              ))}

              <hr />
            </div>
          )}

          {this.props.currentProvider.yearsExperience === false ? null : (
            <div>
              <p className="detail-heading">YEARS OF EXPERIENCE RELATED TO PEDIATRIC FEEDING</p>
              <p className="detail-text">{this.props.currentProvider.yearsExperience}</p>
              <hr />
            </div>
          )}

          {this.props.currentProvider.medicalEducation1 === false ? null : (
            <div>
              <p className="detail-heading">SPECIFIC EDUCATION / TRAINING ON PEDIATRIC FEEDING</p>
              <p className="detail-text">{this.props.currentProvider.medicalEducation1}</p>
              {this.props.currentProvider.medicalMedical2 === false ? null : (
                <p className="detail-text">{this.props.currentProvider.medicalEducation2}</p>
              )}
              {this.props.currentProvider.medicalMedical3 === false ? null : (
                <p className="detail-text">{this.props.currentProvider.medicalEducation3}</p>
              )}
              <hr />
            </div>
          )}

          {this.props.currentProvider.medicalResearch1 === false ? null : (
            <div>
              <p className="detail-heading">RESEARCH / PUBLICATION / PRESENTATIONS ON PEDIATRIC FEEDING</p>
              <p className="detail-text">{this.props.currentProvider.medicalResearch1}</p>
              {this.props.currentProvider.medicalResearch2 === false ? null : (
                <p className="detail-text">{this.props.currentProvider.medicalResearch2}</p>
              )}
              {this.props.currentProvider.medicalResearch3 === false ? null : (
                <p className="detail-text">{this.props.currentProvider.medicalResearch3}</p>
              )}
              <hr />
            </div>
          )}
        </Grid>
      </div>
    )
  }
}
