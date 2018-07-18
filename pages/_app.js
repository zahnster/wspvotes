import App, { Container } from 'next/app'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'

const host = 'http://localhost:3000'
class WSPVotesApp extends App {
  constructor() {
    super()

    // scaffold state
    this.state = {
      nav: null,
      pages: null
    }

    // populate data
    this.getNav()
    this.getPages()

    // bind funcs
    this.getNav = this.getNav.bind(this)
    this.getPages = this.getPages.bind(this)
  }

  getNav() {
    fetch(`${host}/data/nav`)
      .then(res => res.json())
      .then(nav => this.setState({ nav }))
  }

  getPages() {
    fetch(`${host}/data/pages`)
      .then(res => res.json())
      .then(pages => this.setState({ pages }))
  }

  render() {
    const { Component, router } = this.props
    const { nav, pages } = this.state
    const { page } = router.query
    let pageContent = 'Loading...'

    if (pages) {
      // todo: refactor / enhance to support different page "types" (aka, ppl pages)
      const pageMatch = pages.filter(pageData => pageData.urlSlug === page)

      pageContent = pageMatch[0] || {
        pageTitle: 'Not Found',
        content: 'Not found'
      }
    }

    return (
      <Container>
        <Header nav={nav} />
        <Component pageContent={pageContent} />
      </Container>
    )
  }
}

export default WSPVotesApp
