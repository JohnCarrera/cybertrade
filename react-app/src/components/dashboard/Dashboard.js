import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadAssets } from '../../store/assets';
import { loadTransactions } from '../../store/transactions';
import { getAllStocks } from '../../store/stocks';
import WatchlistPanel from '../watchlist/WatchlistPanel';
import DBInfoPanel from './DBInfoPanel';
import dbMainImg from '../../img/neon-city.png'
import './dashboard.css';



export default function Dashboard() {

    const dispatch = useDispatch();
    const cash = useSelector(state => state.assets._CASH);
    const assets = useSelector(state => state.assets);
    const transactions = useSelector(state => state.transactions);
    const stocks = useSelector(state => state.stocks.allStocks);

    const calculateAssetValue = () => {

        return Object.values(assets).reduce((a, x) => {
            if (x.symbol !== '_CASH') {
                console.log(x, a)
                a += x.value * x.quantity;
                return a;
            }
            return a;
        }, 0)
    }

    const convertPad = (num) => {
        if (num.toString().includes('.')) {
            let nums = num.toString().split('.')
            let n1 = nums[0];
            let n2 = nums[1];
            n2 = n2.padEnd(2, '0')
            return `${n1}.${n2}`
        }
        return num
    }

    useEffect(() => {

        dispatch(loadAssets());
        dispatch(loadTransactions());
        dispatch(getAllStocks());
    }, [dispatch])


    return (
        <div className='db-main'>
            <div className='db-main-rt'>
                <div className='db-main-rt-welc db-font-title'
                >
                    Cybertrade Dashboard
                </div>
                <div className='db-main-rt-img-block'>
                    <img className='db-main-img' src={dbMainImg}/>
                </div>
                <DBInfoPanel
                    cash={cash.quantity}
                    assets={assets}
                    transactions={transactions}
                    stocks={stocks}
                />
            </div>
            <div className='db-main-lf'>
                <WatchlistPanel />
            </div>
        </div>
    )
}
