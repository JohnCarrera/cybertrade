import React, { useEffect, useState, useRef } from 'react'
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
    const balance = useSelector(state => state.assets._CASH);
    const assets = useSelector(state => state.assets);

    const [createDiv, setCreateDiv] = useState();
    const [renderCreateDiv, setRenderCreateDiv] = useState(false);
    const [wlpCreateName, setWlpCreateName] = useState('');


    const createRef = useRef();

    useEffect(() => {
        dispatch(getWatchlists());
        dispatch(getAllStocks());
        dispatch(updateStockPrices());
        dispatch(loadAssets());
    }, [dispatch])

    const wlCreateSubmit = (e) => {
        e.preventDefault();
        // e.stopPropagation();
        const data = { name: wlpCreateName }
        setWlpCreateName('');
        closeForm();
        dispatch(createWatchlist(data));

    }

    const openForm = () => {
        setRenderCreateDiv(true);
        createDiv.style.height = '20px'
        // createDiv.style.border = '1px solid #00da86'

    }

    const closeForm = () => {
        setRenderCreateDiv(false);
        createDiv.style.height = '0px';
        // createDiv.style.border = 'none'

    }

    const wlAddBtnClick = (e) => {
        e.preventDefault()
        renderCreateDiv ? closeForm() : openForm()
    }

    useEffect(() => {
        setCreateDiv(document.getElementById(`wlp-create-div`));
        if (createDiv) {
            createDiv.style.height = '0px';
            // createDiv.style.border = 'none'
        }
    }, [createRef]);

    return (
        <div className='wlp-main'>
            <div className='wlp-top'>
                <div className='wlp-title wlp-font'>
                    Watchlists
                </div>
                <div
                    className='wlp-add-div wlp-font'
                    onClick={wlAddBtnClick}
                >
                    <i className="fa-solid fa-square-plus fa-lg" />
                </div>
            </div>
            <div
                className='wlp-create-form-div'
                id={`wlp-create-div`}
                ref={createRef}
            >
            <i className="fa-solid fa-terminal nav-search-icon fa-xs"></i>

                <form className='wlp-create-form' onSubmit={wlCreateSubmit}>
                    <input
                        className='wlp-name-input'
                        type='text'
                        value={wlpCreateName}
                        placeholder='New watchlist name (max 30 char.)'
                        maxLength={30}
                        required={true}
                        onChange={(e) => setWlpCreateName(e.target.value)}
                    />
                </form>
            </div>
            <div className='wlp-lower-main'>
                {watchlists && stocks && prices &&
                    Object.values(watchlists).map(wl => (
                        <Watchlist
                            key={wl.id}
                            wl={wl}
                            stocks={stocks}
                            prices={prices}
                            balance={balance.quantity ? balance.quantity : 0}
                            assets={assets}
                        />
                    ))}
            </div>
        </div>
    )
}
