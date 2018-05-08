import React, { Component } from 'react'
import { ButtonToolbar, Button } from 'react-bootstrap'

export default class Profile extends Component {

  handleNewClick = event => {
    event.preventDefault()
    this.props.history.push(event.currentTarget.getAttribute("href"))
  }

  render() {
    return (
      <div>
        <h4 className="header-green-center">Create, Edit or Delete your profile</h4>
       
        {this.props.isAuthenticated ? (
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="large" onClick={this.handleNewClick}href="/profile/new">
              Create Profile
            </Button>
            <Button bsStyle="primary" bsSize="large">
              Edit Profile
            </Button>
            <Button bsStyle="primary" bsSize="large">
              Delete Profile
            </Button>
          </ButtonToolbar>
          ) : (
            <p>You must be logged in to access your profile</p>
          )}
      </div>
    )
  }
}
