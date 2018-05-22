import React, { Component } from 'react'
import { API } from 'aws-amplify'

export default class Manage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
    }
  }

  async componentDidMount() {
    try {
      const allProfiles = await this.profile()
      this.setState({ allProfiles })
      // console.log(allProfiles)
    } catch (error) {
      alert(error)
    }
    this.setState({ isLoading: false })
  }

  profile() {
    return API.get('peds', '/manage')
  }

  render() {
    return (
      <div>
        <div>
          <p>hello moto</p>
        </div>
      </div>
    )
  }
}
