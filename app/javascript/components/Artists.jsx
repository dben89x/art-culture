import React from 'react'
import $ from 'jquery'

export default class Artists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artists: this.props.artists,
      filterBySearch: false,
      selectedLetter: null,
      hoveredId: null,
      searchInput: '',
    }
  }

  componentDidMount() {
    this.$listings = $('.artist-card')
    $(this.$listings).mouseenter(this.toggleInfoIn).mouseleave(this.toggleInfoOut)
  }

  toggleInfoIn=(e)=>{
    var target = e.target
    var infoId = $(target).data('id')
    console.log(target)
    this.setState({hoveredId: infoId},()=>{console.log(this.state.hoveredId)})
  }

  toggleInfoOut=(e)=>{
    this.setState({hoveredId: null})
  }

  filterByLetter=(letter)=>{
    const {artists} = this.props
    this.setState({selectedLetter: letter})
    var filteredArtists = letter ? artists.filter(artist => artist.name.charAt(0) === letter).sort((a,b)=> b.name.toLowerCase() - a.name.toLowerCase()) : artists
    this.setState({artists: filteredArtists})
  }

  toggleSearchInput=()=>{
    this.setState({filterBySearch: !this.state.filterBySearch, searchInput: ''})
  }

  changeSearchInput=(e)=>{
    const {artists} = this.props
    var target = e.target
    var value = target.value.toLowerCase()
    var filteredArtists = artists.filter(artist => {
      var categoryMatch = artist.categories.filter( cat => cat.toLowerCase().includes(value)).length > 0
      var artistMatch = artist.name.toLowerCase().includes(value)
      var artworkMatch = artist.artworks.filter( artwork => artwork.title.toLowerCase().includes(value)).length > 0
      return categoryMatch || artistMatch || artworkMatch
    })
    this.setState({searchInput: value, artists: filteredArtists})
  }

  render() {
    const letterButtons = this.props.letters.map(letter => (<div className={`letter-btn ${this.state.selectedLetter === letter ? 'selected' : ''}`} key={letter} onClick={()=>this.filterByLetter(letter)}>
      {letter}
    </div>))

    const artistCards = this.state.artists.map(artist => (<div className="artist-card hoverable-listing" key={artist.id}>
        <a href={`/artists/${artist.id}`} className='hoverable-target' data-id={artist.id} onClick={()=> this.setState({hoveredId: null})}>
          <img src={artist.featured_artwork} alt="" style={{pointerEvents: 'none'}}/>
          <div className={`info-wrapper ${this.state.hoveredId === artist.id ? 'hovered' : ''}`} id={`info-${artist.id}`} >
            <div className="info">
              <div className="name">{artist.name}</div>
              <div className="categories">{artist.categories.join(', ')}</div>
            </div>
          </div>
        </a>
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
              <input type="text" value={this.state.searchInput} placeholder='Search for artwork, artists, or styles' onChange={this.changeSearchInput}/>
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
