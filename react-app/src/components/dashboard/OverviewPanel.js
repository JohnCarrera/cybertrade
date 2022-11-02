import React from 'react';
import './overview.css';

export default function OverviewPanel({ assetVal, cashVal, assets, transactions }) {

    console.log('op-trans:', transactions)

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
                    calulated highest valued asset
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
