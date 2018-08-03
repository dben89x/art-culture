import React from 'react'

export default class RelatedArticles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const posts = this.props.posts.map(post=>(<div className="related-article">
      <h3 className="title">{post.title}</h3>
      <hr/>
      <p className="overview">{post.overview}</p>
      <div className="btn-container">
        <a href={`/blog_posts/${post.slug}`} className="action-btn read-more dark">Read more</a>
      </div>
    </div>))

    return (
      <div className="related-articles">
        <div className="articles-wrapper">
          {posts}
        </div>
      </div>
    )
  }
}
