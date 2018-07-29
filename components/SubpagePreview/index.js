import Link from 'next/link'
import Markdown from '../Markdown'

export default props => {
  let title, summaryContent, linkAs, linkHref
  const { page } = props
  const type = page.sys.contentType.sys.id

  switch (type) {
    case 'people':
      title = page.fields.name
      linkAs = `/people/${page.fields.encodedName}`
      linkHref = `/people?personSlug=${page.fields.encodedName}`
      break

    default:
      title = page.fields.pageTitle
      summaryContent = page.fields.summaryContent
      linkAs = page.fields.urlSlug
      linkHref = `/index?page=${page.fields.urlSlug}`
      break
  }

  return (
    <div>
      <h3>
        <Link as={linkAs} href={linkHref}>
          <a>{title}</a>
        </Link>
      </h3>
      {summaryContent ? <Markdown content={summaryContent} /> : null}
    </div>
  )
}
