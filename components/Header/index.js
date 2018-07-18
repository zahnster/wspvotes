import Link from 'next/link'

const recurseNav = navOptions => {
  return navOptions.map(opt => {
    const { urlSlug, pageTitle, subpages } = opt

    return (
      <li key={urlSlug}>
        <Link as={urlSlug} href={`index?page=${opt.urlSlug}`}>
          <a>{opt.pageTitle}</a>
        </Link>

        {opt.subpages ? <ul>{recurseNav(subpages)}</ul> : null}
      </li>
    )
  })
}

export default props => (
  <header>
    <h1>WSP Votes</h1>

    <nav>
      <ul>{recurseNav(props.nav)}</ul>
    </nav>
  </header>
)
