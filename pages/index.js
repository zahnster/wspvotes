import { Component } from 'react'
import Head from 'next/head'

const ward1Color = '#205B8D'
const ward2Color = '#608D20'
const ward3Color = '#A92929'

class IndexPage extends Component {
  componentDidMount() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiemFobnN0ZXIiLCJhIjoiY2pocW1iMW1jMWw4ODM2cGwzMWN5ZmdoOCJ9.rLwhxdCuBsidm3UjP8yu7w'

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-93.0861503, 44.9022852],
      zoom: 13
    })

    const ward1 = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-93.0807316, 44.9196207, 0],
            [-93.0805922, 44.890851, 0],
            [-93.0794764, 44.8908586, 0],
            [-93.0789131, 44.8910905, 0],
            [-93.0775774, 44.891976, 0],
            [-93.0769122, 44.8920824, 0],
            [-93.075394, 44.8920672, 0],
            [-93.0746859, 44.8917897, 0],
            [-93.0729318, 44.8905052, 0],
            [-93.0720735, 44.890357, 0],
            [-93.0696541, 44.8903836, 0],
            [-93.0687851, 44.8906876, 0],
            [-93.0684417, 44.8907408, 0],
            [-93.0678517, 44.8907522, 0],
            [-93.067857, 44.8889546, 0],
            [-93.0704266, 44.888966, 0],
            [-93.0703408, 44.8835385, 0],
            [-93.0689836, 44.883683, 0],
            [-93.0682433, 44.8839034, 0],
            [-93.0664194, 44.884542, 0],
            [-93.0653894, 44.8847092, 0],
            [-93.0652928, 44.919522, 0],
            [-93.0807316, 44.9196207, 0]
          ]
        ]
      },
      properties: { name: 'Ward 1' }
    }

    const ward2 = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-93.0959129, 44.8944309, 0],
            [-93.0904627, 44.8944385, 0],
            [-93.0903071, 44.8943777, 0],
            [-93.0901623, 44.8940243, 0],
            [-93.0899799, 44.8938913, 0],
            [-93.088789, 44.8937127, 0],
            [-93.0880272, 44.8938609, 0],
            [-93.086316, 44.8937317, 0],
            [-93.085168, 44.8940471, 0],
            [-93.0825073, 44.8940547, 0],
            [-93.0825502, 44.8936747, 0],
            [-93.0828184, 44.8933555, 0],
            [-93.0833334, 44.8929983, 0],
            [-93.0835426, 44.8927702, 0],
            [-93.0836338, 44.8921204, 0],
            [-93.083505, 44.8917023, 0],
            [-93.0831724, 44.8912235, 0],
            [-93.0831456, 44.8908282, 0],
            [-93.0805922, 44.890851, 0],
            [-93.0807316, 44.9196207, 0],
            [-93.0909455, 44.9196587, 0],
            [-93.0909991, 44.9228266, 0],
            [-93.0960631, 44.9228342, 0],
            [-93.0960309, 44.919636, 0],
            [-93.0961168, 44.9196473, 0],
            [-93.0959129, 44.8944309, 0]
          ]
        ]
      },
      properties: { name: 'Ward 2' }
    }

    const ward3 = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-93.1058264, 44.9197195, 0],
            [-93.1059444, 44.8834625, 0],
            [-93.0921257, 44.8835765, 0],
            [-93.090983, 44.8835062, 0],
            [-93.0896634, 44.8834569, 0],
            [-93.0889714, 44.8836146, 0],
            [-93.0703408, 44.8835385, 0],
            [-93.0704266, 44.888966, 0],
            [-93.067857, 44.8889546, 0],
            [-93.0678517, 44.8907522, 0],
            [-93.0684417, 44.8907408, 0],
            [-93.0687851, 44.8906876, 0],
            [-93.0696541, 44.8903836, 0],
            [-93.0720735, 44.890357, 0],
            [-93.0729318, 44.8905052, 0],
            [-93.0746859, 44.8917897, 0],
            [-93.075394, 44.8920672, 0],
            [-93.0769122, 44.8920824, 0],
            [-93.0775774, 44.891976, 0],
            [-93.0789131, 44.8910905, 0],
            [-93.0794764, 44.8908586, 0],
            [-93.0831456, 44.8908282, 0],
            [-93.0831724, 44.8912235, 0],
            [-93.083505, 44.8917023, 0],
            [-93.0836338, 44.8921204, 0],
            [-93.0835426, 44.8927702, 0],
            [-93.0833334, 44.8929983, 0],
            [-93.0828184, 44.8933555, 0],
            [-93.0825502, 44.8936747, 0],
            [-93.0825073, 44.8940547, 0],
            [-93.085168, 44.8940471, 0],
            [-93.086316, 44.8937317, 0],
            [-93.0880272, 44.8938609, 0],
            [-93.088789, 44.8937127, 0],
            [-93.0899799, 44.8938913, 0],
            [-93.0901623, 44.8940243, 0],
            [-93.0903071, 44.8943777, 0],
            [-93.0904627, 44.8944385, 0],
            [-93.0959129, 44.8944309, 0],
            [-93.0961168, 44.9196473, 0],
            [-93.1058264, 44.9197195, 0]
          ]
        ]
      },
      properties: { name: 'Ward 3' }
    }

    map.on('load', () => {
      map.addLayer({
        id: 'ward-1',
        type: 'fill',
        source: {
          type: 'geojson',
          data: ward1
        },
        paint: {
          'fill-color': ward1Color,
          'fill-opacity': 0.4
        }
      })

      map.addLayer({
        id: 'ward-2',
        type: 'fill',
        source: {
          type: 'geojson',
          data: ward2
        },
        paint: {
          'fill-color': ward2Color,
          'fill-opacity': 0.4
        }
      })

      map.addLayer({
        id: 'ward-3',
        type: 'fill',
        source: {
          type: 'geojson',
          data: ward3
        },
        paint: {
          'fill-color': ward3Color,
          'fill-opacity': 0.4
        }
      })
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    })

    map.addControl(geocoder)

    const marker = new mapboxgl.Marker()

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
            background: ${ward1Color};
          }

          .key-w2 {
            background: ${ward2Color};
          }

          .key-w3 {
            background: ${ward3Color};
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
