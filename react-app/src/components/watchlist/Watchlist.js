import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWatchlist } from '../../store/watchlists';
import WLStockItem from './WLStockItem';
import Dropdown from '../Dropdown/Dropdown';
import './watchlist.css';

export default function Watchlist({ wl, stocks, prices }) {

    const dispatch = useDispatch()

    const deleteWatchlistClick = (e) => {
        e.preventDefault()
        dispatch(deleteWatchlist(wl.id))
    }

    return (
        <div className='wl-main'>
            <div className='wl-name'>
                {wl.name} {'    '}
                <div onClick={deleteWatchlistClick}>X</div>
                <Dropdown />
            </div>
            <div className='wl-stocks-div'>
                {
                    wl.stocks.map(stock => (
                        <div>
                            <WLStockItem
                                stock={stocks[stock]}
                                price={prices[stock]}
                                wlid={wl.id}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
