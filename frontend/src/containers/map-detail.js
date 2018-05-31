import React from 'react'
import { compose, withProps } from 'recompose'
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require('react-google-maps')
const MapWithAMarker = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=API_KEY&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: props.marker.lat, lng: props.marker.lng }}> 
    <Marker
      position={{ lat: props.marker.lat, lng: props.marker.lng }}
    >
      <InfoWindow>
        <div>{props.marker.firstName} {props.marker.lastName}, {props.marker.professionalDiscipline}</div>
      </InfoWindow>
    </Marker>
  </GoogleMap>
))

export default class MapDetail extends React.PureComponent {
  render() {
    return <MapWithAMarker marker={this.props.currentProvider} />
  }
}
