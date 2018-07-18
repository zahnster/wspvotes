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
      pages: null,
      people: null
    }

    // populate data
    this.getNav()
    this.getPages()
    this.getPeople()

    // bind funcs
    this.getNav = this.getNav.bind(this)
    this.getPages = this.getPages.bind(this)
    this.getPeople = this.getPeople.bind(this)
    this.getPageContent = this.getPageContent.bind(this)
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

  getPeople() {
    fetch(`${host}/data/people`)
      .then(res => res.json())
      .then(people => this.setState({ people }))
  }

  getPageContent() {
    const { contentType, slug } = this.props.pageProps
    const { pages, people } = this.state
    let pageContent = 'Loading...'

    switch (contentType) {
      case 'people':
        if (people) {
          const personMatch = people.filter(
            personData => personData.encodedName === slug
          )

          pageContent = personMatch[0] || {
            pageTitle: 'Not Found',
            content: "We're sorry, this person was not found in our system"
          }
        }

        break

      default:
        if (pages) {
          const pageMatch = pages.filter(pageData => pageData.urlSlug === slug)

          pageContent = pageMatch[0] || {
            pageTitle: 'Not Found',
            content: "We're sorry, this page was not found in our system"
          }
        }
        break
    }

    return pageContent
  }

  render() {
    const { Component } = this.props
    const { nav } = this.state
    let pageContent = this.getPageContent()

    return (
      <Container>
        <Header nav={nav} />
        <Component pageContent={pageContent} />
      </Container>
    )
  }
}

export default WSPVotesApp
