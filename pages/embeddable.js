import React, { Component } from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'

import { getServerRootFrom } from '../util'
import WardMap from '../components/WardMap'

class EmbeddablePage extends Component {
  static async getInitialProps({ req, query }) {
    const serverRoot = getServerRootFrom(req)

    return {
      serverRoot,
      contentType: 'bare'
    }
  }

  render() {
    const { tokenKey } = this.props.router.query

    return (
      <div className="embeddable">
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
  }
}

export default withRouter(EmbeddablePage)

// const EmbeddablePage = withRouter(props => {

//   return (
//     <div>
//       <Head>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta charSet="utf-8" />
//       </Head>

//       <WardMap tokenKey={tokenKey} />

//       <style jsx global>{`
//         #map {
//           height: 100vh;
//           width: 100vw;
//         }
//       `}</style>
//     </div>
//   )
// })

// export default EmbeddablePage
