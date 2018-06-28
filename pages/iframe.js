import { withRouter } from 'next/router'
import Head from 'next/head'

const IframePage = withRouter(props => {
  const { tokenKey } = props.router.query

  const iframeSrc = tokenKey ? `/embeddable?${tokenKey}` : 'embeddable'

  return (
    <div className="container">
      <Head>
        <meta name="viewport" content="initial-scale=1" />
      </Head>

      <iframe src={iframeSrc} height="100%" width="100%" />

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          height: 100vh;
          width: 100vw;
          padding: 0 20px;
        }
      `}</style>
    </div>
  )
})

export default IframePage
