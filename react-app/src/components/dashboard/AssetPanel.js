import React from 'react';
import './assetPanel.css';

export default function AssetPanel({ assets, assetVal, stocks }) {

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
        <div className='ap-main'>
            <table className='ap-table-main'>
                <thead className='ap-thead'>
                    <tr>
                        <th className='ap-th'>
                            Name
                        </th>
                        <th className='ap-th'>
                            Symbol
                        </th>
                        <th className='ap-th'>
                            Qty
                        </th>
                        <th className='ap-th'>
                            PPS
                        </th>
                        <th className='ap-th'>
                            Orig. Value
                        </th>
                        <th className='ap-th'>
                            Curr. PPS
                        </th>
                        <th className='ap-th'>
                            Curr. Value
                        </th>
                        <th className='ap-th'>
                            P/L ($/%)
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(assets).map(asset => (asset.symbol !== '_CASH' &&
                        <tr>
                            <td className='ap-td'>
                                {stocks[asset.symbol].name}
                            </td>
                            <td className='ap-td'>
                                {asset.symbol}
                            </td>
                            <td className='ap-td'>
                                {asset.quantity}
                            </td>
                            <td className='ap-td'>
                                {asset.value}
                            </td>
                            <td className='ap-td'>
                                {convertPad(asset.value * asset.quantity)}
                            </td>
                            <td className='ap-td'>
                                {asset.value}
                            </td>
                            <td className='ap-td'>
                                {convertPad(asset.value * asset.quantity)}
                            </td>
                            <td className='ap-td'>
                                {convertPad(asset.value * asset.quantity - asset.value * asset.quantity)}
                            </td>
                        </tr>
                    ))}

                </tbody>

            </table>
        </div >
    )
}
