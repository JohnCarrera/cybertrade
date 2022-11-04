import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStockDetailApi, getSingleStock } from '../../store/stocks';
import { useParams } from 'react-router-dom'

import WatchlistPanel from '../watchlist/WatchlistPanel';
import { getWatchlists, addStockToWatchlist } from '../../store/watchlists';
import stockChartImg from '../../img/stock-chart.png';
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
    }, dispatch);

    useEffect(() => {
        dispatch(getSingleStock(symbol));
    },[symbol])

    const addToWlSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addStockToWatchlist(selectedWL, symbol))
    }

    return (stock &&
        <div className='sd-main'>
            <div className='sd-main-rt'>
                <div className='sd-main-rt-welc db-font-title'
                >
                    {stock.longName}
                </div>
                <div className='sd-main-rt-img-block'>
                    <div className='sd-chart-top-banner'>

                        <div className='sd-chart-detail-text'>
                            {stock.symbol} {' - '} {'1Y'}
                        </div>
                        <div className='sd-stock-logo-div'>
                            <img className='sd-stock-logo' src={stock.logo_url} />
                        </div>
                    </div>

                    <img className='sd-stock-chart-img' src={stockChartImg} />
                </div>
                <div className='sd-stock-about'>
                    <div className='sd-stock-about-title'>
                        {stock.symbol + ' '}Business Summary
                    </div>

                    <p className='sd-stock-about-p'>
                        {stock.longBusinessSummary}
                    </p>
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
