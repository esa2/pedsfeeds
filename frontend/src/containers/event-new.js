import React, { Component } from 'react'
import { API } from 'aws-amplify'
import { FormGroup, FormControl, Checkbox } from 'react-bootstrap'
import LoaderButton from '../components/loader-button'
import '../styles/event-new.css'

export default class EventNew extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: null,
      name: ''
    }
  }
}
