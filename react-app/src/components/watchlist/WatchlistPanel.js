import React from 'react'
import Watchlist from './Watchlist'
import { useDispatch, useSelector } from 'react-redux';
import { createWatchlist } from '../../store/watchlists';
import './watchlistPanel.css'

export default function WatchlistPanel() {

    const dispatch = useDispatch();

    const addWatchlistClick = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        console.log('adding watchlist')

        const data= { name: 'new watchlist'}
        dispatch(createWatchlist(data));

    }

    return (
        <div className='wlp-main'>
            <div className='wlp-top'>
                <div className='wlp-title wlp-font'>
                    Watchlist Panel
                </div>
                <div
                    className='wlp-add-div wlp-font'
                    onClick={addWatchlistClick}
                >
                    <i class="fa-solid fa-square-plus fa-lg"/>
                </div>
            </div>
            <Watchlist name={'watchlist1'} />
            <Watchlist name={'watchlist2'} />
            <Watchlist name={'watchlist3'} />
            <Watchlist name={'watchlist4'} />
            <Watchlist name={'watchlist5'} />
            <Watchlist name={'watchlist6'} />
        </div>
    )
}
