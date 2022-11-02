import React from 'react';
import './assetPanel.css';

export default function AssetPanel({ assets, assetVal, stocks }) {
    return (
        <div className='ap-main'>
            <div className='ap-header-row'>
                <div className='ap-header-cell'>
                    Name
                </div>
                <div className='ap-header-cell'>
                    Symbol
                </div>
                <div className='ap-header-cell'>
                    Type
                </div>
                <div className='ap-header-cell'>
                    Qty
                </div>
                <div className='ap-header-cell'>
                    PPS
                </div>
                <div className='ap-header-cell'>
                    Orig. Value
                </div>
                <div className='ap-header-cell'>
                    Asset Name
                </div>
                <div className='ap-header-cell'>
                    Current Price
                </div>
                <div className='ap-header-cell'>
                    Current Value
                </div>
            </div>
            {Object.values(assets).map(asset => ( asset.symbol !== '_CASH' &&
                <div className='ap-row'>
                    <div className='ap-row-cell ap-font'>
                        {stocks[asset.symbol].name}
                    </div>
                    <div className='ap-row-cell ap-font'>
                        {asset.symbol}
                    </div>
                    <div className='ap-row-cell ap-font'>
                        {asset.type}
                    </div>
                </div>
            ))}
        </div>
    )
}
