import Link from 'next/link'

const recurseNav = (navOptions, level = 1) => {
  return navOptions.map((opt, i) => (
    <li key={`nav-item-${level}-${i}`}>
      <Link as={opt.urlSlug} href={`index?page=${opt.urlSlug}`}>
        <a>{opt.pageTitle}</a>
      </Link>

      {opt.subpages ? <ul>{recurseNav(opt.subpages, i + 1)}</ul> : null}
    </li>
  ))
}

export default props => (
  <header>
    <h1>WSP Votes</h1>

    <nav>
      <ul>{recurseNav(props.nav)}</ul>
    </nav>
  </header>
)
