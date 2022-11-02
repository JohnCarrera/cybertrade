import React from 'react';
import './overview.css';

export default function OverviewPanel({assetVal, cashVal}) {
  return (
    <div>
        OverviewPanel
        <br/>
        Available Balance: ${cashVal}
        <br/>
        Total Asset Value: ${assetVal}
        </div>
  )
}
