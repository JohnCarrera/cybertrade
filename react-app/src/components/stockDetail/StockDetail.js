import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStockDetailApi, getSingleStock } from '../../store/stocks';
import { useParams, useHistory } from 'react-router-dom'

import WatchlistPanel from '../watchlist/WatchlistPanel';
import { getWatchlists, addStockToWatchlist } from '../../store/watchlists';
import { getAllStocks } from '../../store/stocks';
import stockChartImg from '../../img/stock-chart.png';
import './stockDetail.css';

export default function StockDetail({ stocks }) {
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
            )) {
            dispatch(getSingleStock(symbol));
        } else {
            history.push('/rip');
        }
    }, [symbol])

    const validateDataString = (str) => {
        if (str) return str
        else return 'Not Listed'
    }

    const addToWlSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addStockToWatchlist(selectedWL, symbol))
    }

    return (stock &&
        // <div className='sd-page'>
        // <div className='sd-page'>
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
                <div className='sd-main-lf-info db-font'>
                    <div className='sd-stock-about-title'>
                        {stock.symbol + ' Financial Detail'}
                    </div>
                    <div className='sd-info-upper-panel'>
                        <div>
                            <table className='sd-table-upper'>

                                <tr>
                                    <th className='sd-th'>
                                        Address
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.address)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        City
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.city)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        State
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.state)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        Phone
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.phone)}
                                    </td>
                                </tr>
                            </table>

                        </div>
                        <div className='sd-rating-div'>
                            <div className='sd-rating-title'>
                                cybertrade rating
                            </div>
                            <div className='sd-rating'>
                                {'< ' + stock.recommendationKey + ' >'}
                            </div>
                        </div>

                    </div>
                    <div className='sd-tables'>

                        <div className='sd-tbl'>
                            <table className='sd-table-main'>
                                <tr>
                                    <th className='sd-th'>
                                        average vol.
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.averageVolume)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        10-day avg. vol.
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.averageVolume10days)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        beta
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.beta)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        debt to equity
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.debtToEquity)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        ebitda
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.ebitda)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        operating cash flow
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.operatingCashflow)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        free cash flow
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.freeCashflow)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        shares float
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.floatShares)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        held percent: insiders
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.heldPercentInsiders)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        held percent: institutions
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.heldPercentInstitutions)}
                                    </td>
                                </tr>
                            </table>
                        </div >
                        <div className='sd-tbl'>
                            <table className='sd-table-main'>
                                <tr>
                                    <th className='sd-th'>
                                        current price
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.price)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        50-day avg.
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.fiftyDayAverage)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        200-day avg.
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.twoHundredDayAverage)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        52-week high
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.fiftyTwoWeekHigh)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        52-week low
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.fiftyTwoWeekLow)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        operating margins
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.operatingMargins)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        shares short
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.sharesShort)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        short % of float
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.shortPercentOfFloat)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        short ratio
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.shortRatio)}
                                    </td>
                                </tr>
                                <tr>
                                    <th className='sd-th'>
                                        total debt
                                    </th>
                                    <td className='sd-td'>
                                        {validateDataString(stock.totalDebt)}
                                    </td>
                                </tr>
                            </table>
                        </div >
                    </div>

                </div>
            </div>

            <div className='sd-main-lf'>
                <WatchlistPanel />
            </div>
        </div>
            // {/* <div className='bot-padding'></div>
            // </div> */}
    )
}
