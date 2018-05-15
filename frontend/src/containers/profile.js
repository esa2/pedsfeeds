import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { ButtonToolbar, Button } from 'react-bootstrap'

export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: true
    }
  }
  
  async componentDidMount() {
    try {
      const profile = await this.profile()
      console.log('getting profile')
      console.log(profile)
    } catch (error) {
      alert(error)
    }
    this.setState({ isLoading: false })
  }
  
  profile() {
    return API.get("peds", "/profile")
  }

  handleNewClick = event => {
    event.preventDefault()
    this.props.history.push(event.currentTarget.getAttribute("href"))
  }

  render() {
    return (
      <div>
        <h4 className="header-green-center">Create, Edit or Delete your profile</h4>
        {this.props.isAuthenticated && !this.state.isLoading ? (
          <div>
          <ButtonToolbar>
            <Button bsStyle="primary" bsSize="large" onClick={this.handleNewClick}href="/profile-new">
              Create Profile
            </Button>
            <Button bsStyle="primary" bsSize="large">
              Edit Profile
            </Button>
            <Button bsStyle="primary" bsSize="large">
              Delete Profile
            </Button>
          </ButtonToolbar>
          </div>
           
          ) : (
            <p>You must be logged in to access your profile</p>
          )}
      </div>
    )
  }
}
