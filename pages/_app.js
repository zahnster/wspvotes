import App, { Container } from 'next/app'
import fetch from 'isomorphic-unfetch'

import Header from '../components/Header'

const host = 'http://localhost:3000'

class WSPVotesApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let initialProps = {}

    if (Component.getInitialProps) {
      initialProps = await Component.getInitialProps(ctx)
    }

    const nav = await this.getNav()
    const pageData = await this.getPages()

    return { initialProps, nav, pageData }
  }

  static async getNav() {
    const navQuery = await fetch(`${host}/data/nav`)
    return await navQuery.json()
  }

  static async getPages() {
    const pageQuery = await fetch(`${host}/data/pages`)
    return await pageQuery.json()
  }

  render() {
    const { Component, nav, pageData, initialProps } = this.props

    const pageMatch = pageData.filter(
      page => page.urlSlug === initialProps.urlSlug
    )

    const pageContent = pageMatch[0] || {
      pageTitle: 'Not Found',
      content: 'Not found'
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
