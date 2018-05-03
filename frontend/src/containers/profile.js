import React, { Component } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'

export default class Profile extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h4 className="header-green-center">Create, Edit or Delete your directory listing</h4>
       
        {this.props.isAuthenticated ? (
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="large">
              Create Listing
            </Button>
            <Button bsStyle="primary" bsSize="large">
              Edit Listing
            </Button>
            <Button bsStyle="primary" bsSize="large">
              Delete Listing
            </Button>
          </ButtonToolbar>
          ) : (
            <p>You must be logged in to access the Directory.</p>
          )}
      </div>
    )
  }
}
