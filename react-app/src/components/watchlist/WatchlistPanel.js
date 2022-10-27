import React from 'react'
import Watchlist from './Watchlist'
import './watchlistPanel.css'

export default function WatchlistPanel() {
  return (
    <div className='wlp-main'>
        <div>Watchlist Panel</div>
        <Watchlist name={'watchlist1'} />
        <Watchlist name={'watchlist2'} />
        <Watchlist name={'watchlist3'} />
        <Watchlist name={'watchlist4'} />
        <Watchlist name={'watchlist5'} />
        <Watchlist name={'watchlist6'} />
    </div>
  )
}
