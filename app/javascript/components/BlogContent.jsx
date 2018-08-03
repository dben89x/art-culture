import React from 'react'
import $ from 'jquery'
import showdown from 'showdown'

export default class BlogContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    var {content} = this.props

    var converter = new showdown.Converter()
    var markdown = converter.makeHtml(content)

    const Markdown =({content})=> (
      <div dangerouslySetInnerHTML={{__html: markdown}}></div>
    )
    // var markdown = showdown(content)
    return (
      <div className='post-content'>
        <Markdown content={content}/>
      </div>
    )
  }
}
