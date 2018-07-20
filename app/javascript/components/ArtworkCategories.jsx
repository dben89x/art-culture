import React from 'react'
import $ from 'jquery'

export default class ArtworkCategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hoveredId: null,
    }
  }

  componentDidMount() {
    this.$cards = $('.artwork-category-card')
    $(this.$cards).mouseenter(this.toggleInfoIn).mouseleave(this.toggleInfoOut)
  }

  // toggleInfo=(e)=>{
  //   var infoId = $(e.target).data('id')
  //   $(`#info-${infoId}`).animate({height: 'toggle'})
  // }
  toggleInfoIn=(e)=>{
    var target = e.target
    console.log('got called')
    console.log(target)
    var infoId = $(target).data('id')
    this.setState({hoveredId: infoId}, ()=>{
      console.log(this.state.hoveredId)
    })
  }
  toggleInfoOut=(e)=>{
    var target = e.target
    console.log('got called again')
    console.log(target)
    var infoId = $(target).data('id')
    this.setState({hoveredId: null}, ()=>{
      console.log(this.state.hoveredId)
    })
  }

  render() {
    const {categories} = this.props
    const categoryCards = categories.map(cat => (<div className="artwork-category-card" key={cat.id} id={`cat-${cat.id}`}>
      <div className="img-wrapper" data-id={cat.id}>
        <div className="details-container">
          <img src={cat.image} alt={cat.title}/>
          <div className={`info-wrapper ${this.state.hoveredId === cat.id ? 'hovered' : ''}`} id={`info-${cat.id}`}>
            <div className="info">
              <h2>{cat.title}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>))

    return (
      <div className="artwork-categories-container">
        <div className="artwork-category-cards">
          {categoryCards}
        </div>

      </div>
    )
  }
}