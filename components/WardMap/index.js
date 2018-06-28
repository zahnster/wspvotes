import Head from 'next/head'
import inside from 'point-in-polygon'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { votingPlaces } from '../../data/voting-data'
import {
  w1p1,
  w1p2,
  w2p1,
  w2p2,
  w3p1,
  w3p2,
  w1p1Color,
  w2p1Color,
  w3p1Color
} from '../../data/ward-data'

const wspCityCenter = [-93.0861503, 44.9022852]

class WardMap extends Component {
  constructor() {
    super()

    this.state = {
      votingPlace: null,
      candidates: null,
      showInfoPanel: false,
      address: null,
      ward: null,
      precinct: null
    }

    this.initializeMap = this.initializeMap.bind(this)
    this.updatePopup = this.updatePopup.bind(this)
    this.closeMarker = this.closeMarker.bind(this)
    this.processWardResultsFor = this.processWardResultsFor.bind(this)
  }

  componentDidMount() {
    this.initializeMap()
  }

  initializeMap() {
    const { resultsMode, tokenKey } = this.props
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
    const MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder')

    // assign token key
    mapboxgl.accessToken = tokenKey

    // initialize map elements (map, geocoder, navigationControl, marker, popup)
    const map = new mapboxgl.Map({
      container: 'map',
      interactive: true,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: wspCityCenter,
      zoom: 12,
      minZoom: 12,
      maxZoom: 18
    })
    const geocoder = new MapboxGeocoder({
      accessToken: tokenKey,
      bbox: [-93.1081287, 44.8833858, -93.0678497, 44.9230388],
      proximity: {
        latitude: wspCityCenter[1],
        longitude: wspCityCenter[0]
      }
    })
    const navigationControl = new mapboxgl.NavigationControl({
      showCompass: false
    })
    const marker = new mapboxgl.Marker()
    const popup = new mapboxgl.Popup({
      offset: 35
    })

    // add controls to map
    map.addControl(geocoder)
    map.addControl(navigationControl)

    if (resultsMode === 'popup') {
      marker.setPopup(popup)
    }

    // map load event listener - add ward geocodes
    map.on('load', () => {
      map
        .addLayer(w1p1)
        .addLayer(w1p2)
        .addLayer(w2p1)
        .addLayer(w2p2)
        .addLayer(w3p1)
        .addLayer(w3p2)
    })

    geocoder.on('result', ev => {
      this.processWardResultsFor(ev.result)

      if (resultsMode === 'popup') {
        this.updatePopup()
      }

      marker
        .remove()
        .setLngLat(ev.result.geometry.coordinates)
        .addTo(map)

      if (resultsMode === 'popup') {
        marker.togglePopup()
      }
    })

    // set certain map references to state
    this.setState({ popup, marker })
  }

  processWardResultsFor(result) {
    const { resultsMode } = this.props
    const coords = result.geometry.coordinates

    const isWard1p1 = inside(coords, w1p1.source.data.geometry.coordinates[0])
    const isWard1p2 = inside(coords, w1p2.source.data.geometry.coordinates[0])
    const isWard2p1 = inside(coords, w2p1.source.data.geometry.coordinates[0])
    const isWard2p2 = inside(coords, w2p2.source.data.geometry.coordinates[0])
    const isWard3p1 = inside(coords, w3p1.source.data.geometry.coordinates[0])
    const isWard3p2 = inside(coords, w3p2.source.data.geometry.coordinates[0])

    let address = `${result.address} ${result.text}`
    let showInfoPanel = false
    let votingPlace, ward, precinct

    // load appropriate data for ward and precinct
    if (isWard1p1) {
      ward = 1
      precinct = 1
      votingPlace = votingPlaces.w1p1
    } else if (isWard1p2) {
      ward = 1
      precinct = 2
      votingPlace = votingPlaces.w1p2
    } else if (isWard2p1) {
      ward = 2
      precinct = 1
      votingPlace = votingPlaces.w2p1
    } else if (isWard2p2) {
      ward = 2
      precinct = 2
      votingPlace = votingPlaces.w2p2
    } else if (isWard3p1) {
      ward = 3
      precinct = 1
      votingPlace = votingPlaces.w3p1
    } else if (isWard3p2) {
      ward = 3
      precinct = 2
      votingPlace = votingPlaces.w3p2
    } else {
      // not in WSP
      showInfoPanel = false
      address = null
    }

    // suppress html panel if popup resultsMode is set
    if (resultsMode === 'popup') showInfoPanel = false

    this.setState({
      votingPlace,
      showInfoPanel,
      ward,
      precinct,
      address
    })
  }

  updatePopup() {
    const { votingPlace, address, ward, precinct, popup, marker } = this.state

    popup.setHTML(`
      <div>
        <h2 class="popup_address">${address}</h2>
        <h3 class="popup_ward">Ward ${ward}, Precinct ${precinct}</h3>

        <div class="voting-location">
          <h4 class="voting-location_headline">Voting Location:</h4>
          <p class="voting-location_address">
            <strong>${votingPlace.name}</strong>
            <br />
            ${votingPlace.address}
          </p>
        </div>
      </div>
    `)
  }

  closeMarker() {
    const { marker } = this.state

    this.setState({
      showInfoPanel: false
    })

    marker.remove()
  }

  render() {
    const { votingPlace, showInfoPanel, address, ward, precinct } = this.state

    return (
      <div>
        <Head>
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.3.0/mapbox-gl-geocoder.css"
          />
          <link href="/static/ward-map.css" rel="stylesheet" />
        </Head>

        <div id="map" />

        {showInfoPanel ? (
          <div className="ward-info">
            <button className="close" onClick={this.closeMarker}>
              Close
            </button>

            <div className="address-info">
              <h3>{address}</h3>
              <p>
                Ward {ward}, Precinct {precinct}
              </p>

              <div>
                <h4>Voting Location</h4>
                <p>
                  {votingPlace.name}
                  <br />
                  {votingPlace.address}
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

WardMap.propTypes = {
  resultsMode: PropTypes.string,
  tokenKey: PropTypes.string
}

WardMap.defaultProps = {
  resultsMode: 'popup',
  tokenKey:
    'pk.eyJ1IjoiemFobnN0ZXIiLCJhIjoiY2pocW1iMW1jMWw4ODM2cGwzMWN5ZmdoOCJ9.rLwhxdCuBsidm3UjP8yu7w'
}

export default WardMap
