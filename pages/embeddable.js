import Head from 'next/head'
import { withRouter } from 'next/router'
import WardMap from '../components/WardMap'

const EmbeddablePage = withRouter(props => {
  const { tokenKey } = props.router.query

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>

      <WardMap tokenKey={tokenKey} />

      <style jsx global>{`
        #map {
          height: 100vh;
          width: 100vw;
        }
      `}</style>
    </div>
  )
})

export default EmbeddablePage
