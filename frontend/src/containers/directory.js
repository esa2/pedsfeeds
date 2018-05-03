import React, { Component } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'

export default class Directory extends Component {

  render() {
    return (
      <div>
        <h4 className="header-green-center">Provider Directory</h4>
        <p>Excuse our dust.</p>
        <p>
          The Provider Directory is temporarily offline while make changes to
          the Directory.
        </p>
        <p>Check back soon.</p>
        <ButtonToolbar>
          <Button bsStyle="primary" bsSize="large">
            Medical Care Providers
          </Button>
          <Button bsStyle="primary" bsSize="large">
            Feeding Therapists, OT/PT, SLP
          </Button>
          <Button bsStyle="primary" bsSize="large">
            Counselor / Mental Health Professionals
          </Button>
          <Button bsStyle="primary" bsSize="large">
            Dieticians, Registered
          </Button>
        </ButtonToolbar>
      </div>
    )
  }
}
