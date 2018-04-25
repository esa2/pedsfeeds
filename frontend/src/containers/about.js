import React, { Component } from 'react'
import { Image } from 'react-bootstrap'
import '../styles/base.css'

export default class About extends Component {

  render() {
    return (
      <div>
        <h4 className="header-green">
          PedsFeeds.com is dedicated to providing help for children with feeding issues. Founded by a group of 13 pediatric feeding professionals and parents of children with severe feeding issues, we aim to:
        </h4>
        <p>
          Create a connected community of families and pediatric feeding providers
        </p>
        <p>
          Provide resources and information to support families and professionals
        </p>
        <p>
          Help feeding practitioners improve their effectiveness at helping children reach their highest personal potential in feeding
        </p>
        <p>
          Foster an environment of learning, sharing, and support
        </p>
        <p>
          Improve the availability of care and resources for children with feeding and swallowing issues
        </p>
        <p>
          PedsFeeds.com is the online home of the Pediatric Feeding Association, a professional community of practice. In the coming months, we will expand to include a family support forum. By bringing together parents and professionals, we will improve the feeding experience for all of our kids who struggle with feeding and swallowing disorders.
        </p>
      </div>
    )
  }
}
