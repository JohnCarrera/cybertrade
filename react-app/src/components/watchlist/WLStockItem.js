import React , {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeStockFromWatchlist } from '../../store/watchlists';
import { createTransaction } from '../../store/transactions';
import { addAsset, updateAsset, updateCashBalance } from '../../store/assets';
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
        console.log('balance:', balance)
        console.log('newBalance:', parseFloat(balance - (qty * price)))

        dispatch(updateCashBalance(balance - (qty * price)))

        const data = {
            symbol: stock.symbol,
            price: price,
            quantity: +qty,
            balance: balance - +qty * price
        }

        const tr = await dispatch(createTransaction(data))

        if (tr){

            const assetData = {
                symbol: stock.symbol,
                type: 'STOCK',
                value: price,
            }

            if(asset){
                assetData.qty = Number(asset.quantity) + Number(qty)
                dispatch(updateAsset(asset.id, assetData))
            } else {
                assetData.quantity = qty
                dispatch(addAsset(assetData))
            }

        }
    }

    const sellClick = e => {
        e.preventDefault()

    }

    return (
        <div className='wlsi-main-div'>
            <div className='wlsi-sym'>
                {stock.symbol}
            </div>
            {/* <div className='wlsi-name'>
                {stock.name}
            </div> */}
            <div>
                {price}
            </div>
            <div className='wlsi-buysell'>
                <input
                    className='wlsi-qty'
                    type='number'
                    min={0}
                    value={qty}
                    onChange={e => setQty(e.target.value)}
                />
                <button
                    className='wlsi-buy'
                    onClick={buyClick}
                    disabled={
                        Number(qty) && qty*price <= balance ? false : true
                    }
                >
                    Buy
                </button>
                <button
                    className='wlsi-sell'
                    onClick={sellClick}
                    disabled={
                        asset && Number(qty)
                        ?
                            (asset.quantity >= qty
                                ?
                                    false
                                :
                                    true
                            )
                        :
                            true
                        }
                >
                    Sell
                </button>
            </div>
            <div onClick={removeStock}>
            <i className="fa-solid fa-square-xmark "></i>
            </div>
        </div>
    )
}
