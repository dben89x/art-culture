import React from 'react'

export default class RecentListings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <div id="recent-listings">
        <h2>New Listings</h2>
        <div className="listings-container">
          <div className="listing">
            <img src="https://s3-us-west-1.amazonaws.com/art-culture/images/03.jpg" alt=""/>
          </div>
          <div className="listing">
            <img src="https://s3-us-west-1.amazonaws.com/art-culture/images/03.jpg" alt=""/>
          </div>
          <div className="listing">
            <img src="https://s3-us-west-1.amazonaws.com/art-culture/images/03.jpg" alt=""/>
          </div>
          <div className="listing">
            <img src="https://s3-us-west-1.amazonaws.com/art-culture/images/03.jpg" alt=""/>
          </div>
          <div className="listing">
            <img src="https://s3-us-west-1.amazonaws.com/art-culture/images/03.jpg" alt=""/>
          </div>
          <div className="listing">
            <img src="https://s3-us-west-1.amazonaws.com/art-culture/images/03.jpg" alt=""/>
          </div>
          <div className="listing">
            <img src="https://s3-us-west-1.amazonaws.com/art-culture/images/03.jpg" alt=""/>
          </div>
          <div className="listing">
            <img src="https://s3-us-west-1.amazonaws.com/art-culture/images/03.jpg" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}
