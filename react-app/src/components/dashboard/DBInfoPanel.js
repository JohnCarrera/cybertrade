import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import DashNav from './DashNav';
import OverviewPanel from './OverviewPanel';
import AssetPanel from './AssetPanel';
import TransactionPanel from './TransactionPanel';

import './dbInfoPanel.css';

export default function DBInfoPanel({ cash, assets, transactions }) {

    const [cashStr, setCashStr] = useState(convertPad(cash));
    const [assetVal, setAssetVal] = useState(convertPad(calculateAssetValue(assets)));

    function calculateAssetValue() {
        return Object.values(assets).reduce((a, x) => {
            if (x.symbol !== '_CASH') {
                console.log(x, a)
                a += x.value * x.quantity;
                return a;
            }
            return a;
        }, 0)
    }

    function convertPad(num) {
        if (num.toString().includes('.')) {
            let nums = num.toString().split('.')
            let n1 = nums[0];
            let n2 = nums[1];
            n2 = n2.padEnd(2, '0')
            return `${n1}.${n2}`
        }
        return num
    }

    return (
        <div className='dbip-main-info'>
            <DashNav />
            <Switch>
                <Route path='/app/dashboard/overview'>
                    <OverviewPanel
                        assetVal={assetVal}
                        cashVal={cashStr}
                    />
                </Route>
                <Route path='/app/dashboard/assets'>
                    <AssetPanel />
                </Route>
                <Route path='/app/dashboard/transactions'>
                    <TransactionPanel />
                </Route>
            </Switch>


        </div>
    )
}
