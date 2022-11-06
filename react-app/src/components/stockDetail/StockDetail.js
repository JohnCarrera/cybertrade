import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStockDetailApi, getSingleStock } from '../../store/stocks';
import { useParams, useHistory } from 'react-router-dom'

import WatchlistPanel from '../watchlist/WatchlistPanel';
import { getWatchlists, addStockToWatchlist } from '../../store/watchlists';
import { getAllStocks } from '../../store/stocks';
import stockChartImg from '../../img/stock-chart.png';
import './stockDetail.css';

export default function StockDetail({stocks}) {
    const dispatch = useDispatch();
    const history = useHistory();
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
        if (symbol.toUpperCase !== '_CASH' &&
            Object.keys(stocks).includes(symbol.toUpperCase()
        )){
            dispatch(getSingleStock(symbol));
        } else {
            history.push('/rip');
        }
    },[symbol])

    const addToWlSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addStockToWatchlist(selectedWL, symbol))
    }

    return (stock &&
        <div className='sd-main'>
            <div className='sd-main-lf'>
                <div className='sd-main-rt-welc db-font-title'>
                    {stock.longName}
                    <div className='sd-add-to-wl-grp'>
                        <form
                            onSubmit={addToWlSubmit}
                            className='add-to-wl-form'
                        >

                            <select
                                className='sd-sel-wl'
                                value={selectedWL}
                                onChange={(e) => setSelectedWL(e.target.value)}
                            >
                                <option value='' disabled>Watchlist</option>
                                {watchlists &&
                                    Object.values(watchlists).map((wl) =>
                                        <option
                                            key={wl.id}
                                            value={wl.id}
                                            disabled={watchlists[wl.id].stocks.includes(symbol.toUpperCase())}
                                        >
                                            {wl.name}
                                        </option>
                                    )}
                            </select>
                            <button
                                className='sd-add-btn'
                                type='submit'
                                // disabled={selectedWL !== 'Watchlist'}
                            >
                                Add</button>
                        </form>
                    </div >
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


                </div>
            </div>

            <div className='sd-main-lf'>
                <WatchlistPanel />
            </div>
        </div>
    )
}
