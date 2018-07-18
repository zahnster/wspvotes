import { Component } from 'react'
import { withRouter } from 'next/router'

class PeoplePage extends Component {
  static async getInitialProps({ query }) {
    return {
      contentType: 'people',
      slug: query.personSlug
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

    return (
      <div>
        <h1>{name}</h1>
        <h2>{candidatePosition}</h2>

        {profile}

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
