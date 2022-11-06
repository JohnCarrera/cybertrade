import React from 'react';
import './overview.css';

export default function OverviewPanel({ assetVal, cashVal, assets, transactions }) {


    const calcAssets = () => {
        let asset = {
            max: 0,
            symbol: ''
        }
        for (const assetKey in assets){
            if (assetKey !== '_CASH'){
                let cur = assets[assetKey].quantity * assets[assetKey].value
                if ( cur > asset.max) {
                    asset.max = cur;
                    asset.symbol = assetKey
                }
            }
        }
        return asset
    }

    function convertPad(num) {
        if (num.toString().includes('.')) {
            let nums = num.toString().split('.')
            let n1 = nums[0];
            let n2 = nums[1];

            if (n2.length > 2){
                n2 = n2.substring(0,2)
            }

            n2 = n2.padEnd(2, '0')
            return `${n1}.${n2}`
        }
        return String(num) + '.00'
    }

    return (
        <div className='op-main'>
            <div className='op-row'>
                <div className='op-row-label op-font'>
                    Available Balance:
                </div>
                <div className='op-row-val op-font'>
                    ${cashVal}
                </div>
            </div>
            <div className='op-row'>
                <div className='op-row-label op-font'>
                    Total Asset Value:
                </div>
                <div className='op-row-val op-font'>
                    ${assetVal}
                </div>
            </div>
            <div className='op-row'>
                <div className='op-row-label op-font'>
                 Asset Count:
                </div>
                <div className='op-row-val op-font'>
                    {Object.values(assets).length - 1}
                </div>
            </div>
            <div className='op-row'>
                <div className='op-row-label op-font'>
                 Highest Valued Asset:
                </div>
                <div className='op-row-val op-font'>
                    {convertPad(calcAssets().max)}
                </div>
            </div>
            <div className='op-row'>
                <div className='op-row-label op-font'>
                 Transactions:
                </div>
                <div className='op-row-val op-font'>
                    {Object.values(transactions).length}
                </div>
            </div>

        </div>
    )
}
