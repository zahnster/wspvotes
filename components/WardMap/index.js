import Head from 'next/head'
import inside from 'point-in-polygon'
import { Component } from 'react'

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

    this.processWardResultsFor = this.processWardResultsFor.bind(this)
    this.closeMarker = this.closeMarker.bind(this)
  }

  componentDidMount() {
    const { resultsMode, tokenKey } = this.props
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

    mapboxgl.accessToken =
      tokenKey ||
      'pk.eyJ1IjoiemFobnN0ZXIiLCJhIjoiY2pocW1iMW1jMWw4ODM2cGwzMWN5ZmdoOCJ9.rLwhxdCuBsidm3UjP8yu7w'

    // instantiating & configuring Mapbox classes
    this.map = new mapboxgl.Map({
      container: 'map',
      interactive: true,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-93.0861503, 44.9022852],
      zoom: 12
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    })

    this.marker = new mapboxgl.Marker()

    this.map.addControl(geocoder)
    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: false }))

    // tapping into map events for setup and input responses
    this.map.on('load', () => {
      // adding data layers to the map
      this.map
        .addLayer(w1p1)
        .addLayer(w1p2)
        .addLayer(w2p1)
        .addLayer(w2p2)
        .addLayer(w3p1)
        .addLayer(w3p2)
    })

    geocoder.on('result', ev => {
      this.marker
        .remove()
        .setLngLat(ev.result.geometry.coordinates)
        .addTo(this.map)

      this.processWardResultsFor(ev.result)
    })

    // if (resultsMode !== 'popup') {
    //   map.on('click', ev => {
    //     console.log(ev, marker.getLngLat())

    //     // map.featuresAt(ev.point, { radius: 100, layer: 'YOUR MARKER LAYER ID' }, function (err, features) {
    //     //   console.log(features[0]);

    //     // });
    //   })
    // }
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
    let showInfoPanel = true
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

  closeMarker() {
    this.setState({
      showInfoPanel: false
    })

    this.marker.remove()
  }

  render() {
    const { votingPlace, showInfoPanel, address, ward, precinct } = this.state

    return (
      <div>
        <Head>
          <meta name="viewport" content="initial-scale=1" />
          <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.min.js" />
          <link href="/static/site.css" rel="stylesheet" />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.css"
            type="text/css"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat"
            rel="stylesheet"
          />
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

        <style jsx>{`
          .address-info {
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}

export default WardMap
