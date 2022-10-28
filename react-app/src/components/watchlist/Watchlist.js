import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWatchlist, updateWatchlist } from '../../store/watchlists';
import WLStockItem from './WLStockItem';
import Dropdown from '../Dropdown/Dropdown';
import './watchlist.css';

export default function Watchlist({ wl, stocks, prices }) {

    const dispatch = useDispatch()

    const [wlName, setWlName] = useState(wl.name);

    const deleteWatchlistClick = (e) => {
        e.preventDefault();
        dispatch(deleteWatchlist(wl.id))
    }

    const wlNameSubmit = (e) => {
        e.preventDefault();
        dispatch(updateWatchlist(wl.id, {name:wlName}));
    }

    return (
        <div className='wl-main'>
            <div className='wl-name'>
                {wl.name} {'    '}
                <div onClick={deleteWatchlistClick}>X</div>
                <form onSubmit={wlNameSubmit}>
                    <input
                        className='wl-rename-input'
                        type='text'
                        value={wlName}
                        onChange={(e) => setWlName(e.target.value)}
                    />
                    <button
                        type='submit'
                    >
                        Save
                    </button>
                </form>
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
