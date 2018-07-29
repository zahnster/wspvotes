import './style.scss'

const md = require('markdown-it')({
  html: true,
  breaks: true
})

export default props => (
  <div
    className="content-block"
    dangerouslySetInnerHTML={{ __html: md.render(props.content) }}
  />
)
