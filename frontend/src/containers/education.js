import React, { Component } from 'react'

export default class Education extends Component {
  render() {
    return (
      <div>
        <h4 className="header-green-center">Continuing Education</h4>
        <h4>
          The following websites have information on online continuing education
          courses related to pediatric feeding.
        </h4>
        <p>
          <a href="http://www.educationresourcesinc.com/" target="_blank" rel="noopener noreferrer">
            Education Resources, Inc.
          </a>
        </p>
        <p>
          <a href="http://www.pediatricfeedinginstitute.com/" target="_blank" rel="noopener noreferrer">
            Pediatric Feeding Institute
          </a>
        </p>
        <p>
          <a href="http://www.feedingmatters.org/" target="_blank" rel="noopener noreferrer">
            Feeding Matters
          </a>
        </p>
        <p>
          <a href="http://www.ciaoseminars.com/" target="_blank" rel="noopener noreferrer">
            CIAO Seminars
          </a>
        </p>
        <p>
          <a href="http://www.clinicians-view.com/" target="_blank" rel="noopener noreferrer">
            Clinician's View
          </a>
        </p>
      </div>
    )
  }
}
