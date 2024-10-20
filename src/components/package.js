import React, { useState } from 'react'
import ButtonLoad from './buttonLoad'

const Package = (props) => {
  const [isloading, setLoad] = useState(false)
  const postData = {
    email: props.email,
    ID: props.ID,
    cost: props.amount
  }
  let total = props.daily * props.days
  let rate = props.rate
  let currency = props.currency
  function sendRequest(){
    let proStatus = props.handlePurchase(postData)
    if (proStatus) {
      setLoad(true)
    }else{
      setLoad(false)
    }
  }
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
            {!isloading &&  <button className='w3-btn w3-margin secondary w3-text-white w3-round-large' onClick={sendRequest}>Purchase</button>}
            {isloading && <ButtonLoad name='Loading'/>}
          </div>
        </div>
        <div className='w3-row'>
          <p className='w3-text-grey margin-0'>Low investment | Low risk | High Gains</p>
        </div>
        <div className='w3-row w3-border-bottom'>
          <p className='w3-large bold margin-0'>{currency} {formatNumber(props.amount * rate)}</p>
          <p className='w3-medium bold'>The earnings period is {props.days} Days</p>
        </div>
        {/* <div className='w3-row flex-row'>
          <div className='w3-half w3-padding'>
            <div className='flex-row w3-round w3-border w3-border-teal'>
              <div style={{height: '100%'}} className='w3-half secondary w3-btn'>
                <div className='w3-padding'>
                  <p className='margin-0 w3-text-white'> Daily</p>
                </div>
                
              </div>
              <div className='w3-half w3-padding'>{currency} {props.daily * rate}</div>
            </div>
          </div>
          <div className='w3-half w3-padding'>
            <div className='flex-row w3-round w3-border w3-border-teal'>
              <div className='w3-half secondary w3-padding'>Total Income</div>
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

export default Package