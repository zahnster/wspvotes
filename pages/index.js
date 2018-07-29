import dynamic from 'next/dynamic'
import React, { Component } from 'react'
import { withRouter } from 'next/router'
import ids from 'short-id'

import { getServerRootFrom } from '../util'
import Markdown from '../components/Markdown'

// dynamic components - dynamic import doesn't process scss
// const WardMap = dynamic(import('../components/WardMap'))
import WardMap from '../components/WardMap'

const presetComponents = {
  WardMap
}

class IndexPage extends Component {
  static async getInitialProps({ req, query }) {
    const serverRoot = getServerRootFrom(req)

    return {
      contentType: 'page',
      slug: query.page,
      serverRoot
    }
  }

  render() {
    const { pageTitle, content, componentEmbeds } = this.props.pageContent

    return (
      <div>
        <h2>{pageTitle}</h2>

        {content ? <Markdown content={content} /> : null}

        {componentEmbeds
          ? componentEmbeds.map(name => {
              const Comp = presetComponents[name]
              return Comp ? <Comp key={ids.generate()} /> : null
            })
          : null}
      </div>
    )
  }
}

export default withRouter(IndexPage)
