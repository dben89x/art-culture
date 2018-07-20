import React from 'react'

export default class Artists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      artists: this.props.artists,
      selectedLetter: '',
    }
  }

  filterByLetter=(letter)=>{
    console.log(letter)
    this.setState({selectedLetter: letter})
    var filteredArtists = this.props.artists.filter(artist => artist.name.charAt(0) === letter)
    this.setState({artists: filteredArtists})
  }

  render() {
    const letterButtons = this.props.letters.map(letter => (<div className="letter-btn" key={letter} onClick={()=>this.filterByLetter(letter)}>
      {letter}
    </div>))

    const artistCards = this.state.artists.map(artist => (<div className="artist-card" key={artist.id}>
      <img src={artist.featured_artwork} alt=""/>
    </div>))

    return (
      <div className="artists-container">
        <h2>Browse artists</h2>
        <div className="letter-btns-container">
          {letterButtons}
        </div>
        <div className="artist-cards-container">
          {artistCards}
        </div>
      </div>
    )
  }
}
