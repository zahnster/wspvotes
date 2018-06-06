import { Component } from 'react'
import Head from 'next/head'

import {
  w1p1,
  w1p2,
  w2p1,
  w2p2,
  w3p1,
  w3p2,
  w1p1Color,
  w1p2Color,
  w2p1Color,
  w2p2Color,
  w3p1Color,
  w3p2Color
} from '../data/ward-data'

class IndexPage extends Component {
  componentDidMount() {
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

    geocoder.on('result', function(ev) {
      const coords = ev.result.geometry.coordinates

      marker
        .remove()
        .setLngLat(coords)
        .addTo(map)
    })
  }

  render() {
    return (
      <div>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1,maximum-scale=1,user-scalable=no"
          />
          <script src="https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js" />
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css"
            rel="stylesheet"
          />
          <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.2.0/mapbox-gl-geocoder.min.js" />
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

        <h1>Find My Ward: West Saint Paul Ward Map</h1>

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

        <style jsx global>{`
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Montserrat', sans-serif;
          }

          h1 {
            margin: 20px 30px;
            text-align: center;
          }

          .legend {
            display: flex;
            justify-content: center;
            margin-bottom: 1rem;
          }

          .legend h2 {
            margin-right: 1rem;
          }

          .legend ul {
            display: flex;
          }

          .legend li {
            list-style: none;
            display: flex;
            align-items: center;
            margin-right: 1rem;
          }

          .key {
            height: 1.5rem;
            width: 1.5rem;
            opacity: 0.4;
            margin-right: 0.5rem;
          }

          .key-w1 {
            background: ${w1p1Color};
          }

          .key-w2 {
            background: ${w2p1Color};
          }

          .key-w3 {
            background: ${w3p1Color};
          }

          #map {
            width: 90vw;
            height: 80vh;
            margin: 0 auto;
          }
        `}</style>
      </div>
    )
  }
}

export default IndexPage
