import Head from 'next/head'

export default props => (
  <div className="container">
    <Head>
      <meta name="viewport" content="initial-scale=1" />
    </Head>

    <iframe src="/embeddable" height="100%" width="100%" />

    <style jsx global>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      .container {
        height: 100vh;
        width: 100vw;
      }
    `}</style>
  </div>
)
