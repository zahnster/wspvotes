import Link from 'next/link'

import './style.scss'

const recurseNav = navOptions => {
  return navOptions.map(opt => {
    const { title, urlSlug, subpages, nextPath } = opt

    return (
      <li key={urlSlug}>
        <Link as={urlSlug} href={nextPath}>
          <a>{title}</a>
        </Link>

        {subpages ? <ul>{recurseNav(subpages)}</ul> : null}
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
      <nav className="nav">
        <ul className="nav_list">{recurseNav(props.nav)}</ul>
      </nav>
    ) : null}
  </header>
)
