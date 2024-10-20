import React, { useEffect } from 'react'

const Item = (props) => {
  let total = props.total
  let rate = props.rate
  let currency = props.currency
  let status = props.status
  let stats = true
  useEffect(() => {
    if (status === 'Active') {
      stats = true
    }else{
      stats = false
    }
  }, [status])
  function formatNumber(number) {
    return number.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}
  return (
    <div className='w3-panel w3-border w3-round product'>
        <div className='row flex-row j-space'>
          <div className='w3-left'>
            <p className='w3-text-large margin-0'> <span><i class="fa-solid fa-compact-disc"></i> </span> {props.name}</p>
          </div>
          <div style={{width: '30%'}}></div>
          <div className='w3-right'>
            <button className={`w3-btn w3-margin ${(status == 'Active') ? 'w3-green': 'inactive'} w3-round`}>{(status === 'Active') ? 'Active' : 'Inactive'}</button>
          </div>
        </div>
        <div className='w3-row'>
          <p className='w3-text-grey margin-0'>Low investment | Low risk | High Gains</p>
        </div>
        <div className='w3-row w3-border-bottom'>
          <p className='w3-large bold margin-0'>{currency} {props.amount * rate}</p>
          <p className='w3-medium bold'>The remaining period is {props.days} Days</p>
        </div>
        {/* <div className='w3-row flex-row'>
          <div className='w3-half w3-padding'>
            <div className='flex-row w3-round w3-border w3-border-yellow'>
              <div className='w3-half secondary w3-padding'>Daily Income</div>
              <div className='w3-half w3-padding'>{currency} {props.daily * rate}</div>
            </div>
          </div>
          <div className='w3-half w3-padding'>
            <div className='flex-row w3-round w3-border w3-border-yellow'>
              <div className='w3-half secondary w3-padding'>Total Claimed</div>
              <div className='w3-half w3-padding'>{currency} {total * rate}</div>
            </div>
          </div>
        </div> */}
        <div style={{width: '100%'}} className='w3-row flex-row j-center'>
          <div className='w3-half grid-center'>
            <div style={{width: '100%'}} className='w3-row padding-sm flex-row'>
              <button className='w3-small w3-btn secondary bold  w3-text-white btn-prod1'>Daily Yeild</button>
              <button className='w3-small w3-btn bold w3-text-black btn-prod2'>{currency} {props.daily * rate}</button>
            </div>
          </div>
          <div  className='w3-half grid-center'>
            <div style={{width: '100%'}} className='w3-row flex-row'>
              <button className='w3-small w3-btn secondary bold  w3-text-white btn-prod1'>Total Income</button>
              <button className='w3-small w3-btn bold w3-text-black btn-prod2'>{currency} {total * rate}</button>
            </div>
          </div>
        </div>
        
    </div>
  )
}

export default Item