import Head from 'next/head'
import WardMap from '../components/WardMap'

export default props => (
  <div>
    <WardMap />
    <style jsx global>{`
      #map {
        height: 100vh;
        width: 100vw;
      }
    `}</style>
  </div>
)
