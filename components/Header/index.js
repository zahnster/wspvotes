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
    <h1>
      <Link as="/" href="index?page=/">
        <a>WSP Votes</a>
      </Link>
    </h1>

    {props.nav ? (
      <nav>
        <ul>{recurseNav(props.nav)}</ul>
      </nav>
    ) : null}
  </header>
)
