import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { removeStockFromWatchlist } from '../../store/watchlists';
import { createTransaction } from '../../store/transactions';
import { addAsset, updateAsset, updateCashBalance, removeAsset } from '../../store/assets';
import './wlStockItem.css';

export default function WLStockItem({ stock, price, wlid, balance, asset }) {

    const dispatch = useDispatch()

    const [qty, setQty] = useState(0);

    const removeStock = (e) => {
        e.preventDefault();
        dispatch(removeStockFromWatchlist(wlid, stock.symbol));
    }

    const buyClick = async e => {
        e.preventDefault()

        dispatch(updateCashBalance(balance - (qty * price)))

        const data = {
            symbol: stock.symbol,
            price: price,
            quantity: +qty,
            balance: balance - +qty * price
        }

        const tr = await dispatch(createTransaction(data))

        if (tr) {

            const assetData = {
                symbol: stock.symbol,
                type: 'STOCK',
                value: price,
            }

            if (asset) {
                assetData.quantity = Number(asset.quantity) + Number(qty)
                dispatch(updateAsset(asset.id, assetData))
            } else {
                assetData.quantity = Number(qty)
                dispatch(addAsset(assetData))
            }
        }
    }

    const sellClick = async e => {
        e.preventDefault()

        dispatch(updateCashBalance(balance + (qty * price)))


        const data = {
            symbol: stock.symbol,
            price: price,
            quantity: +qty * -1,
            balance: balance + (qty * price)
        }

        const tr = await dispatch(createTransaction(data))

        if (tr) {

            const assetData = {
                symbol: stock.symbol,
                type: 'STOCK',
                value: price,
            }

            if (asset) {
                if (Number(asset.quantity) - Number(qty) <= 0) {
                    dispatch(removeAsset(asset.id))
                } else {
                    assetData.quantity = Number(asset.quantity) - Number(qty)
                    dispatch(updateAsset(asset.id, assetData))
                }
            }
        }
    }

    return (
        <tr className='wlsi-tr-main'>

            <td className='wlsi-sym wlsi-text'>
                <Link className='wlsi-sym-link cyber-grad' to={`/app/stocks/${stock.symbol}`}>
                {stock.symbol}
                </Link>
            </td>
            {/* <div className='wlsi-name'>
                {stock.name}
            </div> */}
            <td className='wlsi-price wlsi-text'>
                {price}
            </td>
            <td className='wlsi-owned wlsi-text'>
                {asset ? asset.quantity : 0}
            </td>
            <td className='wlsi-ip'>
                    <input
                        className='wlsi-qty'
                        type='number'
                        value={qty}
                        onChange={e => setQty(e.target.value)}
                    />
                    <button
                        className='wlsi-buy wlsi-ab'
                        onClick={buyClick}
                        type='submit'
                        disabled={
                            Number(qty) &&
                            Number(qty) > 0 &&
                            qty * price <= balance ? false : true
                        }
                    >
                        Buy
                    </button>
                    <button
                        className='wlsi-sell wlsi-ab'
                        onClick={sellClick}
                        type='submit'
                        disabled={
                            asset &&
                            Number(qty) &&
                            Number(qty) > 0 &&
                            Number(qty) ? (asset.quantity >= qty
                                    ? false
                                    : true)
                                : true
                        }
                    >
                       {'Sell'}
                    </button>
            </td>
            <td className='wlsi-td-rem' onClick={removeStock}>
                <i className="fa-solid fa-square-xmark fa-lg"></i>
            </td>

        </tr>
    )
}
