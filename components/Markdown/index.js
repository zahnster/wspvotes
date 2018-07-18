const md = require('markdown-it')({
  html: true,
  breaks: true
})

export default props => (
  <div dangerouslySetInnerHTML={{ __html: md.render(props.content) }} />
)
