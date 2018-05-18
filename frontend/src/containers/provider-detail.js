import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export default class ProviderDetail extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <ListGroup>
          <ListGroupItem
            // header={`${this.props.value.lastName}, ${
            //   this.props.value.firstName
            // }`}
            header={this.props.value.listingTitle}
          />
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="PROFESSIONAL DISCIPLINE">
            {this.props.value.professionalDiscipline}
          </ListGroupItem>
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="PLACE OF EMPLOYMENT">
            Organization / Company {this.props.value.empOrganization}
          </ListGroupItem>
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="WORK CONTACT INFORMATION" />
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="WORK SETTING" />
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="AGES SERVED" />
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="PAYMENT TYPES ACCEPTED" />
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="EXPERIENCE IN TREATING CHILDREN WITH THESE MEDICAL CONDITIONS" />
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="EXPERIENCE IN TREATING CHILDREN WITH THESE FEEDING CONDITIONS" />
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="FEEDING CLINICAL PRACTICE SPECIALTIES" />
        </ListGroup>

        <ListGroup>
          <ListGroupItem header="YEARS OF EXPERIENCE RELATED TO PEDIATRIC FEEDING" />
        </ListGroup>
      </div>
    )
  }
}
