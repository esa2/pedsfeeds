import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

export default class ProviderDetail extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <Grid className="detail-page">
          <Row>
            <Col md={9}>
              <br />
              <br />
              <h6 className="detail-title">{this.props.value.listingTitle}</h6>
            </Col>

            <Col md={3}>
              {this.props.value.attachment === null ? null : (
                <img
                  width={70}
                  height={80}
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
          <hr />

          {this.props.value.providerGroup === false ? null : (
            <div>
              <p className="detail-heading">PROVIDER GROUP</p>
              <p className="detail-text">{this.props.value.providerGroup}</p>
              <hr />
            </div>
          )}
          {this.props.value.providerGroupText === false ? null : (
            <div>
              <p className="detail-heading">PROVIDER GROUP</p>
              <p className="detail-text">
                {this.props.value.providerGroupText}
              </p>
              <hr />
            </div>
          )}

          <p className="detail-heading">WORK SETTING</p>
          {this.props.value.workSetting.map((ele, i) => (
            <li key={i}>{ele}</li>
          ))}
          <hr />

          {this.props.value.agesServed !== [] ? null : (
            <div>
              <p className="detail-heading">AGES SERVED</p>
              <p className="detail-text">{this.props.value.agesServed}</p>
              <hr />
            </div>
          )}

          {this.props.value.paymentTypes !== [] ? null : (
            <div>
              <p className="detail-heading">PAYMENT TYPES ACCEPTED</p>
              <hr />
            </div>
          )}

          {this.props.value.medicalConditions !== [] ? null : (
            <div>
              <p className="detail-heading">
                EXPERIENCE IN TREATING CHILDREN WITH THESE MEDICAL CONDITIONS
              </p>
              <hr />
            </div>
          )}

          {this.props.value.feedingConditions !== [] ? null : (
            <div>
              <p className="detail-heading">
                EXPERIENCE IN TREATING CHILDREN WITH THESE FEEDING CONDITIONS
              </p>
              <hr />
            </div>
          )}

          {this.props.value.practiceSpecialties !== [] ? null : (
            <div>
              <p className="detail-heading">
                FEEDING CLINICAL PRACTICE SPECIALTIES
              </p>
              <hr />
            </div>
          )}

          <div>
            <p className="detail-heading">SPECIALTY</p>
            {this.props.value.medicalSpecialty.map((ele, i) => (
              <li key={i}>{ele}</li>
            ))}
            <hr />
          </div>

          {this.props.value.experience !== [] ? null : (
            <div>
              <p className="detail-heading">
                YEARS OF EXPERIENCE RELATED TO PEDIATRIC FEEDING
              </p>
              <p className="detail-text">{this.props.value.experience}</p>
              <hr />
            </div>
          )}

          {this.props.value.medicalExperienceTreating === [] ? null : (
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
        </Grid>
      </div>
    )
  }
}
