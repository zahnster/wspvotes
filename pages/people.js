import { Component } from 'react'
import { withRouter } from 'next/router'

import { getServerRootFrom } from '../util'
import Markdown from '../components/Markdown'

class PeoplePage extends Component {
  static async getInitialProps({ req, query }) {
    const serverRoot = getServerRootFrom(req)

    return {
      contentType: 'people',
      slug: query.personSlug,
      serverRoot
    }
  }

  render() {
    const { pageContent = {} } = this.props
    const {
      name,
      candidatePosition,
      profile,
      website,
      facebook,
      twitter
    } = pageContent

    // console.log(md.render(profile))

    return (
      <div>
        <h1>{name}</h1>
        <h2>{candidatePosition}</h2>

        {profile ? <Markdown content={profile} /> : null}

        <ul>
          {website ? <li>Website: {website}</li> : null}
          {facebook ? <li>Facebook: {facebook}</li> : null}
          {twitter ? <li>Twitter: {twitter}</li> : null}
        </ul>
      </div>
    )
  }
}

export default withRouter(PeoplePage)
