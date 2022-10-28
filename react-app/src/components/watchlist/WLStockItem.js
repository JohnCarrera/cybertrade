import React from 'react'
import { useDispatch ,useSelector } from 'react-redux'
import { removeStockFromWatchlist } from '../../store/watchlists';

export default function WLStockItem({stock, price, wlid}) {

    const dispatch = useDispatch()

    const removeStock = (e) => {
        e.preventDefault();
        dispatch(removeStockFromWatchlist(wlid, stock.symbol));
    }

    return (
        <div>
            {stock.symbol} {' | '}
            {stock.name} {' | '}
            {price}
            <div onClick={removeStock}>X</div>
        </div>
    )
}
