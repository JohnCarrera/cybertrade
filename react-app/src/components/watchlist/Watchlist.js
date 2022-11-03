import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWatchlist, updateWatchlist } from '../../store/watchlists';
import WLStockItem from './WLStockItem';
import Dropdown from '../Dropdown/Dropdown';
import './watchlist.css';

export default function Watchlist({ wl, stocks, prices, balance, assets }) {

    const dispatch = useDispatch()

    const [wlName, setWlName] = useState(wl.name);
    const [editDiv, setEditDiv] = useState();
    const [renderEditDiv, setRenderEditDiv] = useState(false);

    const editRef = useRef();

    const deleteWatchlistClick = (e) => {
        e.preventDefault();
        dispatch(deleteWatchlist(wl.id))
    }

    const openForm = () => {
        setRenderEditDiv(true);
        editDiv.style.height = '20px'
        editDiv.style.border = '1px solid #00da86'

    }

    const closeForm = () => {
        setRenderEditDiv(false);
        editDiv.style.height = '0px';
        editDiv.style.border = 'none'

    }

    const wlNameSubmit = (e) => {
        e.preventDefault();
        closeForm();
        setRenderEditDiv(false);
        dispatch(updateWatchlist(wl.id, { name: wlName }));
    }

    const editWatchlistClick = (e) => {
        e.preventDefault()

        renderEditDiv ? closeForm() : openForm()
    }

    useEffect(() => {
        setEditDiv(document.getElementById(`wl-${wl.id}-edit-div`));
        if (editDiv) {
            editDiv.style.height = '0px';
            editDiv.style.border = 'none'
        }
    }, [editRef]);

    return (
        <div className='wl-main'>
            <div className='wl-header'>

                <div className='wl-name'>
                    {wl.name}
                </div>
                <div className='wl-icons'>
                    <div className='wl-icon-div' onClick={editWatchlistClick}>
                        <i className="fa-regular fa-pen-to-square fa-lg"></i>
                    </div>
                    <div className='wl-icon-div wl-del-div' onClick={deleteWatchlistClick}>
                        <i className="fa-solid fa-square-xmark fa-lg"></i>
                    </div>
                </div>
            </div>
            <div
                className='wl-edit-form-div'
                id={`wl-${wl.id}-edit-div`}
                ref={editRef}
            >
            <i className="fa-solid fa-terminal nav-search-icon fa-xs"></i>

                <form className='wl-edit-form' onSubmit={wlNameSubmit}>
                    <input
                        className='wl-rename-input'
                        type='text'
                        value={wlName}
                        required={true}
                        onChange={(e) => setWlName(e.target.value)}
                    />
                </form>
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
