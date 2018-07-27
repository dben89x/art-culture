import React from 'react'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

export default class TradingHistory extends React.Component {
  constructor(props) {
    super(props)
    var artworkLogs = this.props
    this.state = {
      selectedLog: artworkLogs[artworkLogs.length - 1]
    }
  }

  render() {
    const {artworkLogs} = this.props
    var logs = this.props.artworkLogs.map((log, index) => {
      var date = new Date(log.created_at)

      return (<div className="log" key={log.id}>
        {index < (artworkLogs.length - 1) ? `${monthNames[date.getMonth()]} ${date.getFullYear()}` : "Current Owner"}

      </div>)
    })

    return (
      <div className="trading-history">
        <div className="head">
          <h2>TRADING HISTORY</h2>
        </div>
        <div className="logs">
          {logs}
        </div>
      </div>
    )
  }
}
