import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStockDetailApi, getSingleStock } from '../../store/stocks';
import { useParams } from 'react-router-dom'

import WatchlistPanel from '../watchlist/WatchlistPanel';
import { getWatchlists, addStockToWatchlist } from '../../store/watchlists';
import './stockDetail.css';

export default function StockDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const { symbol } = params;

    const [selectedWL, setSelectedWL] = useState('');

    const watchlists = useSelector(state => state.watchlists);
    const stock = useSelector(state => state.stocks.singleStock);

    useEffect(() => {
        dispatch(getWatchlists());
        // dispatch(getStockDetailApi(symbol));
        dispatch(getSingleStock(symbol));
    }, dispatch);

    const addToWlSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addStockToWatchlist(selectedWL, symbol))
    }

    return ( stock &&
            <div className='sd-main'>
                <div className='sd-main-rt'>
                    <div className='sd-main-rt-welc db-font-title'
                    >
                        {stock.longName}
                    </div>
                    <div className='sd-main-rt-img-block'>

                    </div>
                    <div className='sd-main-rt-info db-font'>
                        <div>
                            <form onSubmit={addToWlSubmit}>

                                <select
                                    className='sd-sel-wl'
                                    value={selectedWL}
                                    onChange={(e) => setSelectedWL(e.target.value)}
                                >
                                    <option value=''>Watchlist</option>
                                    {watchlists &&
                                        Object.values(watchlists).map((wl) =>
                                            <option
                                                key={wl.id}
                                                value={wl.id}
                                            >
                                                {wl.name}
                                            </option>
                                        )}
                                </select>
                                <button
                                    className='sd-add-btn'
                                    type='submit'
                                >
                                    Add</button>
                            </form>
                        </div >

                    </div>
                </div>
                <div className='sd-main-lf'>
                    <WatchlistPanel />
                </div>
            </div>
    )
}
