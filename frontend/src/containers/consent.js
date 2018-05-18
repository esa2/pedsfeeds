import React, { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'

export default class Consent extends Component {
  render() {
    return (
      <div>
        <p>
          Please read these
          <a href="/tos" target="_blank" rel="noopener noreferrer">
            <span> Terms and Conditions of Use </span>
          </a>
          carefully. By accessing or using this Website, you agree to be bound
          by the terms and conditions described herein and all terms, policies,
          guidelines and disclosures incorporated by reference.{' '}
          <strong>
            If you do not agree to all of these terms, do not use this website.
          </strong>
        </p>
        <p>
          If you agree to be bound by the terms of this Agreement, you should
          click on "I agree" at the bottom of this window to continue the
          provider search.
        </p>
        <p>
          <strong>Note:</strong>{' '}
          <em>
            We use our best efforts to provide accurate information regarding
            the diagnosis or treatment of feeding issues, and providers of any
            services related to feeding and swallowing; however, we make no
            promise, guarantee, representation, or assurance regarding any
            particular provider referenced on our Website, including without
            limitation its certification or licensure status or the quality or
            safety of its services. You should thoroughly investigate any
            provider from whom you are considering engaging services. Do not
            rely on the information published on this Website for medical
            advice. Neither the company nor the Website provides medical advice.
            The content of this Website should not substitute for medical advice
            from a health professional. If you or your child has a health
            problem, speak to your doctor or a health professional immediately
            about your condition. Use of our Website signifies your agreement to
            our
            <a href="/tos" target="_blank" rel="noopener noreferrer">
              <span> Terms and Conditions of Use</span>
            </a>.
          </em>
        </p>
        <ButtonToolbar>
          <Button bsStyle="success" bsSize="large" active href="/directory">
            I agree
          </Button>
          <Button bsStyle="primary" bsSize="large" active href="/">
            I decline
          </Button>
        </ButtonToolbar>
      </div>
    )
  }
}
