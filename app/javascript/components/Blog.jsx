import React from 'react'
import $ from 'jquery'
import PaginatedResults from './PaginatedResults'
import BlogCard from './BlogCard'

export default class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogPosts: this.props.blogPosts,
    }
  }

  render() {
    const {recentPosts, perPage} = this.props
    const {blogPosts} = this.state

    return (<div id="blog">
      <h1>NEWS</h1>
      <div className="content-container">
        <div id="blog-posts-container" className='results-container'>

          <PaginatedResults
            results={this.state.blogPosts}
            IndividualResult={BlogCard}
            perPage={perPage}
            containerTarget='#blog'
            resultClassName='posts'/>
        </div>
      </div>
    </div>
    )
  }
}
