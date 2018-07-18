require('dotenv').config()

const express = require('express')
const next = require('next')
const Contentful = require('contentful')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const port = process.env.PORT || 3000

const recurseNav = navLevel => {
  return navLevel.map(item => {
    const contentType = item.sys.contentType.sys.id
    const { subpages } = item.fields
    let title, urlSlug, subpageData, nextPath

    switch (contentType) {
      case 'people':
        title = item.fields.name
        urlSlug = `/people/${item.fields.encodedName}`
        nextPath = `/people?personSlug=${item.fields.encodedName}`
        break

      // default is Page type
      default:
        title = item.fields.pageTitle
        urlSlug = item.fields.urlSlug
        nextPath = `/index?page=${urlSlug}`
        break
    }

    if (subpages) {
      subpageData = recurseNav(subpages)
    }

    return {
      title,
      urlSlug,
      nextPath,
      subpages: subpageData
    }
  })
}

app.prepare().then(() => {
  const server = express()
  const client = Contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_KEY
  })

  // Data APIs.
  server.get('/data/nav', (req, res) => {
    client
      .getEntries({ content_type: 'topNavigation', include: 10 })
      .then(response => {
        const navEntries = recurseNav(response.items[0].fields.navigationItems)
        res.type('text/json').send(navEntries)
      })
  })

  server.get('/data/pages', (req, res) => {
    client.getEntries({ content_type: 'page', include: 1 }).then(response => {
      const pages = response.items.map(page => page.fields)
      res.type('text/json').send(pages)
    })
  })

  server.get('/data/people', (req, res) => {
    client.getEntries({ content_type: 'people' }).then(response => {
      const people = response.items.map(person => person.fields)
      res.type('text/json').send(people)
    })
  })

  // Page APIs
  server.get('/people/:personSlug', (req, res) => {
    app.render(req, res, '/people', { personSlug: req.params.personSlug })
  })

  server.get('*', (req, res) => {
    app.render(req, res, '/index', { page: req.params[0] })
  })

  server.listen(port, err => {
    if (err) throw err
    if (dev) console.log(`> Ready on http://localhost:${port}`)
  })
})
