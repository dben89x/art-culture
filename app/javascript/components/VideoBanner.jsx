import React from 'react'

export default class VideoBanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: true,
    }
  }

  componentDidMount() {
    this.$video = $('video').get(0)
    this.$playBtn = $('#play-btn').get(0)
    $(this.$playBtn).fadeOut(200)
  }

  spaceButtonPressed=(e)=>{
    e.preventDefautl()
    if (e.keyCode === 32) {
      this.togglePlay()
    }
  }

  togglePlay=()=>{
    this.setState({playing: !this.state.playing}, ()=>{
      this.state.playing ?  this.playVideo() : this.pauseVideo()
    })
  }

  playVideo=()=>{
    this.$video.play()
    $(this.$playBtn).fadeOut(200)
  }

  pauseVideo=()=>{
    this.$video.pause()
    $(this.$playBtn).fadeIn(200)
  }

  render() {

    return (
      <div className="artist-video-banner">
        <video poster={this.props.poster} width='100%' controls={false} autoPlay onClick={this.togglePlay} onKeyPress={this.spaceButtonPressed}>
          <source src={this.props.src} type="video/mp4" />
        </video>
        <div id='play-btn' className="fas fa-play" onClick={this.togglePlay}>
        </div>
      </div>
    )
  }
}
