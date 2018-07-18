import { Component } from 'react'
import { withRouter } from 'next/router'

import Markdown from '../components/Markdown'
class IndexPage extends Component {
  static async getInitialProps({ query }) {
    return {
      contentType: 'page',
      slug: query.page
    }
  }

  render() {
    const { pageTitle, content } = this.props.pageContent

    return (
      <div>
        <h2>{pageTitle}</h2>

        {content ? <Markdown content={content} /> : null}
      </div>
    )
  }
}

export default withRouter(IndexPage)
