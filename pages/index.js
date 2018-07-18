import { Component } from 'react'
import { withRouter } from 'next/router'

class IndexPage extends Component {
  static async getInitialProps({ query }) {
    return {
      urlSlug: query.page
    }
  }

  render() {
    const { pageTitle, content } = this.props.pageContent

    return (
      <div>
        <h2>{pageTitle}</h2>
        <p>{content}</p>
      </div>
    )
  }
}

export default withRouter(IndexPage)
