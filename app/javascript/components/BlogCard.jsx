import React from 'react'

export default class BlogCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    const {result} = this.props

    return (<div href={`blog_posts/${result.slug}`} className="blog-post-container result-container">
      <div className="blog-post-card result-card">
        <div className="img-wrapper">
          <img src={result.image} alt={result.title}/>
        </div>
        <div className="details">
          <div className="header-wrapper">
            {/* <div className="category">{result.category}</div>
            <div className="date">{result.created_at}</div> */}
          </div>
          <h3 className="title">{result.title}</h3>
          <p className="overview">{result.overview}</p>
          <div className="btn-container">
            <a href={`blog_posts/${result.slug}`} className="action-btn read-more dark">Read more</a>
          </div>
        </div>
      </div>
    </div>)

  }
}
