import { Component } from 'react'
import Head from 'next/head'
import inside from 'point-in-polygon'

import { councilMembers } from '../data/rep-data'
import { votingPlaces } from '../data/voting-data'
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
} from '../data/ward-data'

class IndexPage extends Component {
  constructor() {
    super()

    this.state = {
      councilReps: null,
      votingPlace: null,
      showInfoPanel: false,
      address: null,
      ward: null,
      precinct: null
    }

    this.processWardResultsFor = this.processWardResultsFor.bind(this)
  }

  componentDidMount() {
    const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')

    mapboxgl.accessToken =
      'pk.eyJ1IjoiemFobnN0ZXIiLCJhIjoiY2pocW1iMW1jMWw4ODM2cGwzMWN5ZmdoOCJ9.rLwhxdCuBsidm3UjP8yu7w'

    // instantiating & configuring Mapbox classes
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-93.0861503, 44.9022852],
      zoom: 13
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    })

    const marker = new mapboxgl.Marker()

    map.addControl(geocoder)
    map.addControl(
      new mapboxgl.NavigationControl({
        showCompass: false
      })
    )

    // tapping into map events for setup and input responses
    map.on('load', () => {
      // adding data layers to the map
      map.addLayer(w1p1)
      map.addLayer(w1p2)
      map.addLayer(w2p1)
      map.addLayer(w2p2)
      map.addLayer(w3p1)
      map.addLayer(w3p2)
    })

    geocoder.on('result', ev => {
      marker
        .remove()
        .setLngLat(ev.result.geometry.coordinates)
        .addTo(map)

      this.processWardResultsFor(ev.result)
    })

    map.on('click', ev => {
      console.log(ev, marker.getOffset())

      // map.featuresAt(ev.point, { radius: 100, layer: 'YOUR MARKER LAYER ID' }, function (err, features) {
      //   console.log(features[0]);

      // });
    })
  }

  processWardResultsFor(result) {
    const coords = result.geometry.coordinates

    const isWard1p1 = inside(coords, w1p1.source.data.geometry.coordinates[0])
    const isWard1p2 = inside(coords, w1p2.source.data.geometry.coordinates[0])
    const isWard2p1 = inside(coords, w2p1.source.data.geometry.coordinates[0])
    const isWard2p2 = inside(coords, w2p2.source.data.geometry.coordinates[0])
    const isWard3p1 = inside(coords, w3p1.source.data.geometry.coordinates[0])
    const isWard3p2 = inside(coords, w3p2.source.data.geometry.coordinates[0])

    let address = `${result.address} ${result.text}`
    let showInfoPanel = true
    let councilReps, votingPlace, ward, precinct

    // load appropriate data for ward and precinct
    if (isWard1p1) {
      councilReps = councilMembers.filter(cp => cp.ward === 'Ward 1')
      votingPlace = votingPlaces.w1p1
      ward = 1
      precinct = 1
    } else if (isWard1p2) {
      councilReps = councilMembers.filter(cp => cp.ward === 'Ward 1')
      votingPlace = votingPlaces.w1p2
      ward = 1
      precinct = 2
    } else if (isWard2p1) {
      councilReps = councilMembers.filter(cp => cp.ward === 'Ward 2')
      votingPlace = votingPlaces.w2p1
      ward = 2
      precinct = 1
    } else if (isWard2p2) {
      councilReps = councilMembers.filter(cp => cp.ward === 'Ward 2')
      votingPlace = votingPlaces.w2p2
      ward = 2
      precinct = 2
    } else if (isWard3p1) {
      councilReps = councilMembers.filter(cp => cp.ward === 'Ward 3')
      votingPlace = votingPlaces.w3p1
      ward = 3
      precinct = 1
    } else if (isWard3p2) {
      councilReps = councilMembers.filter(cp => cp.ward === 'Ward 3')
      votingPlace = votingPlaces.w3p2
      ward = 3
      precinct = 2
    } else {
      // not in WSP
      showInfoPanel = false
      address = null
    }

    this.setState({
      councilReps,
      votingPlace,
      showInfoPanel,
      ward,
      precinct,
      address
    })
  }

  render() {
    const {
      councilReps,
      votingPlace,
      showInfoPanel,
      address,
      ward,
      precinct
    } = this.state

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

        <h1>
          <span>Find My Ward:</span> West Saint Paul Ward Map
        </h1>

        <div className="legend">
          <h2>Legend:</h2>
          <ul>
            <li>
              <div className="key key-w1" />
              Ward 1
            </li>
            <li>
              <div className="key key-w2" />
              Ward 2
            </li>
            <li>
              <div className="key key-w3" />
              Ward 3
            </li>
          </ul>
        </div>

        <div id="map" />

        {showInfoPanel ? (
          <div className="ward-info">
            <button
              className="close"
              onClick={() =>
                this.setState({
                  showInfoPanel: false
                })
              }
            >
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

            <div className="voting-info" style={{ display: 'none' }}>
              <div>
                <h4>Your Council Representatives</h4>
                <div className="rep-info grid">
                  {councilReps.map((rep, ri) => (
                    <p className="flex" key={`rep-${ri}`}>
                      <strong>{rep.name}</strong>
                      <br />
                      {rep.email}
                      <br />
                      {rep.termExpires}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <style jsx>{`
          .key-w1 {
            background: ${w1p1Color};
          }

          .key-w2 {
            background: ${w2p1Color};
          }

          .key-w3 {
            background: ${w3p1Color};
          }

          .ward-info {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.9);
            padding: 1.5rem 2rem;
            z-index: 50;
            box-shadow: -2px 0 5px rgba(0, 0, 0, 0.4);
          }

          .voting-info {
            max-width: 800px;
            margin: 0 auto;
          }

          .voting-info > div {
            margin: 0 1rem;
          }

          .address-info {
            text-align: center;
          }

          .rep-info > p {
            margin: 0 1rem;
          }

          #map {
            overflow: hidden;
          }
        `}</style>
      </div>
    )
  }
}

export default IndexPage
