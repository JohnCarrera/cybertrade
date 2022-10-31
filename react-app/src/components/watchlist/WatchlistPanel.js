import React, { useEffect } from 'react'
import Watchlist from './Watchlist'
import { useDispatch, useSelector } from 'react-redux';
import { createWatchlist, getWatchlists } from '../../store/watchlists';
import { getAllStocks, updateStockPrices } from '../../store/stocks';
import { loadAssets } from '../../store/assets';
import './watchlistPanel.css'

export default function WatchlistPanel() {

    const dispatch = useDispatch();
    const watchlists = useSelector(state => state.watchlists);
    const stocks = useSelector(state => state.stocks.allStocks);
    const prices = useSelector(state => state.stocks.prices);
    const balance = useSelector(state => state.assets._CASH)

    useEffect(() => {
        dispatch(getWatchlists());
        dispatch(getAllStocks());
        dispatch(updateStockPrices());
        dispatch(loadAssets());
    },[dispatch])

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
                    <i className="fa-solid fa-square-plus fa-lg"/>
                </div>
            </div>
            {watchlists && stocks && prices &&
                Object.values(watchlists).map( wl  => (
                    <Watchlist
                        key={wl.id}
                        wl={wl}
                        stocks={stocks}
                        prices={prices}
                        balance={balance.quantity ? balance.quantity : 0}
                    />
                ))}
        </div>
    )
}
