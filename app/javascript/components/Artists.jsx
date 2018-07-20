import React from 'react'
import $ from 'jquery'

export default class Artists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artists: this.props.artists,
      filterBySearch: false,
      selectedLetter: null,
      searchInput: '',
    }
  }

  filterByLetter=(letter)=>{
    const {artists} = this.props
    this.setState({selectedLetter: letter})
    var filteredArtists = letter ? artists.filter(artist => artist.name.charAt(0) === letter) : artists
    this.setState({artists: filteredArtists})
  }

  toggleSearchInput=()=>{
    this.setState({filterBySearch: !this.state.filterBySearch})
  }

  changeSearchInput=(e)=>{
    var target = e.target
    console.log(target.value)
    this.setState({searchInput: target.value})
  }

  render() {
    const letterButtons = this.props.letters.map(letter => (<div className={`letter-btn ${this.state.selectedLetter === letter ? 'selected' : ''}`} key={letter} onClick={()=>this.filterByLetter(letter)}>
      {letter}
    </div>))

    const artistCards = this.state.artists.map(artist => (<div className="artist-card" key={artist.id}>
      <img src={artist.featured_artwork} alt=""/>
    </div>))

    return (
      <div className="artists-container">
        <h2>Browse artists</h2>
        <div className="filter-container">
          <div className="far fa-search search-btn" onClick={this.toggleSearchInput}></div>
          <div className="filter-options">
            <div id="filter-by-letters" className={this.state.filterBySearch ? 'hidden' : 'shown'}>
              {letterButtons}
              <div className="all-btn" onClick={()=>this.filterByLetter(null)}>ALL</div>
            </div>
            <div id="filter-by-search" className={this.state.filterBySearch ? 'shown' : 'hidden'}>
              <input type="text" placeHolder='Search for artwork, artists, or styles' onChange={this.changeSearchInput}/>
              <div className="close-search" onClick={this.toggleSearchInput}>&times;</div>
            </div>
          </div>
        </div>
        <div className="artist-cards-container">
          {artistCards}
        </div>
      </div>
    )
  }
}
