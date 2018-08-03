import React from 'react'
import $ from 'jquery'

export default class PaginatedResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      currentResults: this.props.results.slice(0, this.props.perPage),
      currentPageIndex: 0
    }
  }

  componentDidMount() {
    this.$resultsContainer = $(this.props.containerTarget)
  }

  componentWillReceiveProps(props) {
    this.setState({currentResults: props.results.slice(0, this.props.perPage)})
  }

  nextPage = (results, pages, index) => {
    if (index < 0 || index >= pages) return

    var firstResultIndex = index * this.props.perPage
    var lastResultIndex = firstResultIndex + this.props.perPage

    $('html, body').animate({scrollTop: $(this.$resultsContainer).offset().top})
    this.setState({ currentPageIndex: index })
    this.setState({ currentResults: results.slice(firstResultIndex, lastResultIndex) })
  }

  render() {
    const {results, IndividualResult, perPage, resultClassName, customAction} = this.props

    const PageButton = ({index}) => (<div className={`result-page-btn`} onClick={() => this.nextPage(results, pages, index)}>
      <div className={`page-btn ${this.state.currentPageIndex === index ? 'selected' : ''}`}>
        {index + 1}
      </div>
    </div>)

    const Results = ({results}) => (
      <div className={`results ${resultClassName}`}>
        {results.map(result => <IndividualResult key={result.id} result={result} customAction={customAction}/>)}
      </div>
    )

    const pages = Math.ceil(results.length / perPage)

    var pageElements = []
    for (var i = 0; i < pages; i++) { pageElements.push(<PageButton index={i} key={i}/>) }

    return (
      <div className="paginated-results">

        <Results results={this.state.currentResults}/>

        { pages > 1 ? (<div className="results-pages">
            <a className="prev-btn page-btn" onClick={() => this.nextPage(results, pages, (this.state.currentPageIndex - 1))}>
              <i className='far fa-chevron-left' alt="" />
              <span>Previous</span>
            </a>
            {pageElements}
            <a className="next-btn page-btn" onClick={() => this.nextPage(results, pages, (this.state.currentPageIndex + 1))}>
              <span>Next</span>
              <i className='far fa-chevron-right' alt="" />
            </a>
          </div>) : (
            null
          )
        }
      </div>
    )
  }
}
