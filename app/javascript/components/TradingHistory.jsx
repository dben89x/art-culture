import React from 'react'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

export default class TradingHistory extends React.Component {
  constructor(props) {
    super(props)
    var {artworkLogs} = this.props

    this.state = {
      selectedLog: artworkLogs[artworkLogs.length - 1]
    }
  }

  render() {

    const {artworkLogs} = this.props
    var logs = this.props.artworkLogs.map((log, index) => {
      var date = new Date(log.created_at)

      return (<div className={`log-date ${this.state.selectedLog === log ? 'selected' : ''}`} onClick={()=> this.setState({selectedLog: log})} key={log.id}>
        {index < (artworkLogs.length - 1) ? `${monthNames[date.getMonth()]} ${date.getFullYear()}` : "Current Owner"}
      </div>)
    })

    return (
      <div className="trading-history">
        <div className="head">
          <h2>TRADING HISTORY</h2>
        </div>
        <div className="logs">
          <div className="log-dates">
            {logs}
          </div>
          <div className="log-info-wrapper">
            <div className="log-description">{this.state.selectedLog.description}</div>
            <div className="log-details">
              <div className="current-owner">

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
