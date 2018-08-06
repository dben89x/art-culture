import React from 'react'

export default class Errors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {

    return (
      <div className={`errors ${this.props.errors.length > 0 ? 'with-border' : ''}`}>
        {this.props.errors.map(error => (<div className='error' key={Math.floor((1 + Math.random()) * 0x10000)}>{error}</div>))}
      </div>
    )
  }
}
