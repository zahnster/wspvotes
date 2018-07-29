import Document, { Head, Main, NextScript } from 'next/document'

class WSPVotesDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:400,800"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>

        <style jsx global>{`
          body {
            font-family: 'Raleway', sans-serif;
            font-size: 1.2rem;
            line-height: 1.5;
          }
        `}</style>

        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.3.0/mapbox-gl-geocoder.css"
        />
      </html>
    )
  }
}

export default WSPVotesDocument
