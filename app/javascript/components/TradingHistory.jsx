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
    const {selectedLog} = this.state
    var logs = this.props.artworkLogs.map((log, index) => {
      var date = new Date(log.created_at)

      return (<div className={`log-date ${this.state.selectedLog === log ? 'selected' : ''}`} onClick={()=> this.setState({selectedLog: log})} key={log.id}>
        {index < (artworkLogs.length - 1) ? `${monthNames[date.getMonth()]} ${date.getFullYear()}` : "Current Owner"}
      </div>)
    })

    return (
      <div className="trading-history">
        <div className="trading-history-container">
          <div className="head">
            <h2>TRADING HISTORY</h2>
          </div>

          <div className="logs">
            {this.props.artworkLogs.length > 0 ? (
              <div>
                <div className="log-dates">
                  {logs}
                </div>
                <div className="log-info-wrapper">
                  <p className="log-description">{selectedLog.description}</p>
                  <div className="log-details">
                    <h3>Details of Sale:</h3>
                    <p className="owner">
                      <span className='head-text'>{"CURRENT OWNER: "}</span>
                      <span className='text'>{selectedLog.user}</span>
                    </p>
                    <p className="purchase-price">
                      <span className='head-text'>{"PURCHASE PRICE: "}</span>
                      <span className='text'>${selectedLog.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-trade">
                <p>This piece has no trading history</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
