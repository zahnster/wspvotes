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
      cityPosition,
      profile,
      website,
      facebook,
      twitter
    } = pageContent

    // console.log(md.render(profile))

    return (
      <div>
        <h1>{name}</h1>
        <ul>
          <li>
            <strong>Running For:</strong> {candidatePosition}
          </li>
          {cityPosition ? (
            <li>
              <strong>Current Position:</strong> {cityPosition}
            </li>
          ) : null}
        </ul>

        <div className="user-profile">
          {profile ? <Markdown content={profile} /> : null}
        </div>

        <section>
          <h3>In the news</h3>
          <p>[todo]</p>
        </section>

        <section>
          <h3>Submit a Question</h3>
          <p>[todo]</p>
        </section>

        <section>
          <ul>
            {website ? <li>Website: {website}</li> : null}
            {facebook ? <li>Facebook: {facebook}</li> : null}
            {twitter ? <li>Twitter: {twitter}</li> : null}
          </ul>
        </section>
      </div>
    )
  }
}

export default withRouter(PeoplePage)
