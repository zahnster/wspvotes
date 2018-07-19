import Link from 'next/link'
import classNames from 'classnames'

import './style.scss'

const recurseNav = (navOptions, options) => {
  const { countNav, navLength } = options
  const halfLength = Math.floor(navLength / 2)

  return navOptions.map((opt, i) => {
    const { title, urlSlug, subpages, nextPath } = opt
    const classes = countNav
      ? classNames({
          nav_left: i < halfLength,
          nav_center: i === halfLength,
          nav_right: i > halfLength
        })
      : null

    return (
      <li key={urlSlug} className={classes}>
        <Link as={urlSlug} href={nextPath}>
          <a>{title}</a>
        </Link>

        {subpages ? <ul>{recurseNav(subpages, { countNav: false })}</ul> : null}
      </li>
    )
  })
}

export default props => {
  const nav = props.nav || []
  const navLength = nav.length

  return (
    <header>
      <h1>
        <Link as="/" href="index?page=/">
          <a>WSP Votes</a>
        </Link>
      </h1>

      {props.nav ? (
        <nav className="nav">
          <ul className="nav_list">
            {recurseNav(props.nav, { countNav: true, navLength })}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
