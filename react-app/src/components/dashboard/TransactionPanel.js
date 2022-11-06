import React from 'react'
import './transactionPanel.css'

export default function TransactionPanel({transactions}) {

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
    <div className='tp-main'>
    <table className='tp-table-main'>
        <thead className='tp-thead'>
            <tr>
                <th className='tp-th'>
                    ID
                                    </th>
                <th className='tp-th'>
                    Symbol
                </th>
                <th className='tp-th'>
                    Qty
                </th>
                <th className='tp-th'>
                    Side
                </th>
                <th className='tp-th'>
                    PPS
                </th>
                <th className='tp-th'>
                    Total Value
                </th>
                <th className='tp-th'>
                    Balance
                </th>
            </tr>
        </thead>
        <tbody className='tp-tbody'>
            {Object.values(transactions).map(tr => (tr.symbol !== '_CASH' &&
                <tr>
                    <td className='tp-td'>
                        {tr.id}
                    </td>
                    <td className='tp-td'>
                        {tr.symbol}
                    </td>
                    <td className='tp-td'>
                        {tr.quantity}
                    </td>
                    <td className='tp-td'>
                        {tr.quantity > 0 ? 'BUY' : 'SELL'}
                    </td>
                    <td className='tp-td'>
                        {convertPad(tr.price)}
                    </td>
                    <td className='tp-td'>
                        {convertPad(tr.price * tr.quantity)}
                    </td>
                    <td className='tp-td'>
                        {convertPad(tr.balance)}
                    </td>
                </tr>
            ))}

        </tbody>

    </table>
</div >
  )
}
