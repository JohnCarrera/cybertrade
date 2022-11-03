import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWatchlist, updateWatchlist } from '../../store/watchlists';
import WLStockItem from './WLStockItem';
import Dropdown from '../Dropdown/Dropdown';
import './watchlist.css';

export default function Watchlist({ wl, stocks, prices, balance, assets }) {

    const dispatch = useDispatch()

    const [wlName, setWlName] = useState(wl.name);

    const deleteWatchlistClick = (e) => {
        e.preventDefault();
        dispatch(deleteWatchlist(wl.id))
    }

    const wlNameSubmit = (e) => {
        e.preventDefault();
        dispatch(updateWatchlist(wl.id, { name: wlName }));
    }

    const editForm = (
        <form onSubmit={wlNameSubmit}>
            <input
                className='wl-rename-input'
                type='text'
                value={wlName}
                onChange={(e) => setWlName(e.target.value)}
            />
        </form>
    )

    return (
        <div className='wl-main'>
            <div className='wl-header'>

                <div className='wl-name'>
                    {wl.name}
                </div>
                <div className='wl-del-div' onClick={deleteWatchlistClick}>
                    <i className="fa-solid fa-square-xmark fa-lg"></i>
                </div>
            </div>
            <table className='wl-table'>
                <thead>
                    <tr>
                        <th className='wl-th'>
                            Sym
                        </th>
                        <th className='wl-th'>
                            PPS
                        </th>
                        <th className='wl-th'>
                            Owned
                        </th>
                        <th className='wl-th-a'>
                            Action
                        </th>
                        <th className='wl-th-x'>
                            X
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        wl.stocks.map(stock => (
                            <WLStockItem
                                stock={stocks[stock]}
                                // price={prices[stock]}
                                price={stocks[stock].price}
                                balance={balance}
                                asset={assets[stock] ? assets[stock] : null}
                                wlid={wl.id}
                            />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
