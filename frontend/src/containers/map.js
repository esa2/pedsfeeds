import React from 'react'
import { compose, withProps } from 'recompose'
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
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
  <GoogleMap defaultZoom={4} defaultCenter={{ lat: 41.85, lng: -87.65 }}>
    <MarkerClusterer averageCenter enableRetinaIcons gridSize={40}>
      {props.allProfiles.map(profile => (
        <Marker
          onClick={() => {
            props.markerClick(profile.uuId)
            props.onToggleOpen
          }}
          key={profile.uuId}
          position={{ lat: profile.lat, lng: profile.lng }}
          title={`${profile.firstName} ${profile.lastName}, ${profile.professionalDiscipline}`}
        >
         {props.showInfoWindow &&  props.showInfoIndex === profile.uuId ? (
            <InfoWindow onCloseClick={props.closeClick}>
              <div>
                {profile.firstName} {profile.lastName}, {profile.professionalDiscipline}
              </div>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>
))

export default class Map extends React.PureComponent {
  state = {
    showInfoWindow: false,
  }

  handleMarkerClick = markerId => {
    this.setState({
      showInfoIndex: markerId, showInfoWindow: !this.state.showInfoWindow
    })
  }

  handleCloseClick = () => {
    this.setState({
      showInfoWindow: !this.state.showInfoWindow
    })
  }

  render() {
    return (
      <MapWithAMarkerClusterer
        allProfiles={this.props.allProfiles}
        showInfoIndex={this.state.showInfoIndex}
        markerClick={this.handleMarkerClick}
        closeClick={this.handleCloseClick}
        showInfoWindow={this.state.showInfoWindow}
      />
    )
  }
}
