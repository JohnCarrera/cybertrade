import React, {useState, useEffect} from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import DashNav from './DashNav';
import OverviewPanel from './OverviewPanel';
import AssetPanel from './AssetPanel';
import TransactionPanel from './TransactionPanel';

import './dbInfoPanel.css';

export default function DBInfoPanel({ cash, assets, transactions, stocks }) {

    const [cashStr, setCashStr] = useState();
    const [assetVal, setAssetVal] = useState(convertPad(calculateAssetValue(assets)));

    function calculateAssetValue() {
        return Object.values(assets).reduce((a, x) => {
            if (x.symbol !== '_CASH') {
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
        return String(num) + '.00'
    }

    useEffect(() => {
        setCashStr(convertPad(cash));
        setAssetVal(convertPad(calculateAssetValue(assets)));
    }, [cash, assetVal]);

    return ( assets && transactions && stocks &&
        <div className='dbip-main-info'>
            <DashNav />
            <Switch>
                <Route path='/app/dashboard/overview'>
                    <OverviewPanel
                        assetVal={assetVal}
                        cashVal={cashStr}
                        assets={assets}
                        transactions={transactions}
                    />
                </Route>
                <Route path='/app/dashboard/assets'>
                    <AssetPanel
                        assets={assets}
                        assetVal={assetVal}
                        stocks={stocks}
                    />
                </Route>
                <Route path='/app/dashboard/transactions'>
                    <TransactionPanel
                        transactions={transactions}
                    />
                </Route>
            </Switch>


        </div>
    )
}
