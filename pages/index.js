import Head from 'next/head'
import WardMap from '../components/WardMap'
import { w1p1Color, w2p1Color, w3p1Color } from '../data/ward-data'

export default () => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link href="/static/ward-map.css" rel="stylesheet" />
      <link href="/static/site.css" rel="stylesheet" />
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

    <WardMap />

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
    `}</style>
  </div>
)
