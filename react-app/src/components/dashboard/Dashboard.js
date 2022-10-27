import React from 'react';

import WatchlistPanel from '../watchlist/WatchlistPanel';
import './dashboard.css';

export default function Dashboard() {
    return (
        <div className='db-main'>
            <div className='db-main-rt'>
                <div className='db-main-rt-welc db-font-title'
                >
                    Cybertrade Dashboard
                </div>
                <div className='db-main-rt-img-block'>

                </div>
            <div className='db-main-rt-info db-font'>
                Account Balance: {'data'}
                <br/>
                Positions: {'data'}
                <br/>
                Open Orders: {'data'}

            </div>
            </div>
            <div className='db-main-lf'>
                <WatchlistPanel />
            </div>
        </div>
    )
}
