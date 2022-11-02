import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadAssets } from '../../store/assets';
import WatchlistPanel from '../watchlist/WatchlistPanel';
import './dashboard.css';



export default function Dashboard() {

    const dispatch = useDispatch();
    const cash = useSelector(state => state.assets._CASH);
    const assets = useSelector(state => state.assets);

    const [balance, setBalance] = useState('');
    const [assetVal, setAssetVal] = useState(0);


    const calculateAssetValue = () => {

     return Object.values(assets).reduce( (a, x) => {
            if (x.symbol !== '_CASH'){
                console.log(x, a)
                a += x.value * x.quantity;
                return a;
            }
        }, 0)
    }

    useEffect(() => {

        dispatch(loadAssets());
    },[dispatch])

    useEffect(() => {

        setBalance(cash.quantity);
        console.log(balance);

        if (balance.toString().includes('.')){
            let bals = balance.toString().split('.')
            let bal1 = bals[0];
            let bal2 = bals[1];
            bal2 = bal2.padEnd(2,'0')
            setBalance(bal1 + '.' + bal2)
        }

        // else {
        //     setBalance(`${balance}.00` );
        // }
    },[balance, cash])

    useEffect(() => {
        setAssetVal(calculateAssetValue());
    }, [assets])

    return (
        <div className='db-main'>
            <div className='db-main-rt'>
                <div className='db-main-rt-welc db-font-title'
                >
                    Cybertrade Dashboard
                </div>
                <div className='db-main-rt-img-block'>

                </div>
            <div className='db-main-rt-info db-font'>
                Available Balance: { balance ? balance : 'Loading...'}
                <br/>
                Assets: {calculateAssetValue()}

            </div>
            </div>
            <div className='db-main-lf'>
                <WatchlistPanel />
            </div>
        </div>
    )
}
