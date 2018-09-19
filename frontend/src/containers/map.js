import React from 'react'
import { compose, withProps } from 'recompose'
import ProviderDetail from './provider-detail'
import MapDetail from './map-detail'
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
              <div className="info-name" onClick={props.nameClick(profile)}>
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
    showListing: false,
  }

  handleMarkerClick = markerId => {
    this.setState({
      showInfoIndex: markerId, showInfoWindow: !this.state.showInfoWindow,
      showListing: false
    })
  }

  handleNameClick = (provider) => {
    this.setState({ provider: provider, showListing: true})
  }

  handleCloseClick = () => {
    this.setState({
      showInfoWindow: !this.state.showInfoWindow,
      showListing: !this.state.showListing
    })
  }

  renderListing() {
    const showListing = this.state.showListing
    return showListing ? (
      <div id="providerDetail">
        <ProviderDetail currentProvider={this.state.provider} />
        <MapDetail currentProvider={this.state.provider} />
      </div>
    ) : null
  }

  render() {
    return (
      <div>
        <MapWithAMarkerClusterer
          allProfiles={this.props.allProfiles}
          showInfoIndex={this.state.showInfoIndex}
          markerClick={this.handleMarkerClick}
          nameClick={this.handleNameClick}
          closeClick={this.handleCloseClick}
          showInfoWindow={this.state.showInfoWindow}
        />
         {this.renderListing(this.state.provider)}
      </div>
    )
  }
}
