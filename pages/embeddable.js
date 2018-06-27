import { withRouter } from 'next/router'
import WardMap from '../components/WardMap'

const EmbeddablePage = withRouter(props => {
  const { tokenKey } = props.router.query

  return (
    <div>
      <WardMap tokenKey={tokenKey} />
      <style jsx global>{`
        #map {
          height: 100vh;
          width: 100vw;
        }
      `}</style>
    </div>
  )
})

export default EmbeddablePage
