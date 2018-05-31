import React from 'react'
import { compose, withProps } from 'recompose'
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require('react-google-maps')
const {
  MarkerClusterer,
} = require('react-google-maps/lib/components/addons/MarkerClusterer')

const MapWithAMarkerClusterer = compose(
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
  <GoogleMap defaultZoom={4} defaultCenter={{ lat: 41.850, lng: -87.650 }}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.allProfiles.map(profile => (
        <Marker
          key={profile.uuId}
          position={{ lat: profile.lat, lng: profile.lng }}
          title={`${profile.firstName} ${profile.lastName}, ${profile.professionalDiscipline}`}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
))

export default class Map extends React.PureComponent {

  render() {
    return <MapWithAMarkerClusterer allProfiles={this.props.allProfiles} />
  }
}
