import React from 'react'
import LogoutButton from '../auth/LogoutButton'
import './accountButton.css'

export default function AccountButton() {
  return (
    <div className='ab-main'>
        <LogoutButton classProp='ab-btn-text cyber-grad'/>
        <div className='ab-btn-text cyber-grad'>/account</div>
    </div>
  )
}
