import { Fragment } from 'react'
import App, { Container } from 'next/app'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'
import '../style/app-styles.scss'

class WSPVotesApp extends App {
  constructor(props) {
    super()

    const { serverRoot } = props.pageProps

    // populate data
    this.getNav(serverRoot)
    this.getPages(serverRoot)
    this.getPeople(serverRoot)

    // bind funcs
    this.getNav = this.getNav.bind(this)
    this.getPages = this.getPages.bind(this)
    this.getPeople = this.getPeople.bind(this)
    this.getPageContent = this.getPageContent.bind(this)

    // scaffold state
    this.state = {
      nav: null,
      pages: null,
      people: null
    }
  }

  getNav(serverRoot) {
    fetch(`${serverRoot}/data/nav`)
      .then(res => res.json())
      .then(nav => this.setState({ nav }))
  }

  getPages(serverRoot) {
    fetch(`${serverRoot}/data/pages`)
      .then(res => res.json())
      .then(pages => this.setState({ pages }))
  }

  getPeople(serverRoot) {
    fetch(`${serverRoot}/data/people`)
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
    const contentType = this.props.pageProps.contentType
    let pageContent = this.getPageContent()

    return (
      <Container>
        {contentType === 'bare' ? (
          <Component pageContent={pageContent} />
        ) : (
          <Fragment>
            <Header nav={nav} />
            <div className="page-content">
              <Component pageContent={pageContent} />
            </div>
          </Fragment>
        )}
      </Container>
    )
  }
}

export default WSPVotesApp
