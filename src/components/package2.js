import React, { useState } from 'react'

function Package2(props) {
  const [isloading, setLoad] = useState(false)
  const postData = {
    email: props.email,
    ID: props.ID,
    cost: props.cost
  }
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
    <div className='w3-col l4 m4 s6 padding-sm'>
        <div className='w3-panel w3-round-large w3-white'>
            <div className='w3-row grid-center'>
                <img src={props.image} width={100} />
            </div>
            <div className='w3-row'>
                <p className='w3-large margin-0 bold'>{props.name}</p>
                <p className='w3-large margin-0 bold primary'>{formatNumber(props.cost * props.rate)}</p>
                <p className='w3-text-green bold w3-medium margin-0'><span className='w3-large margin-0'><i class="fa-solid fa-caret-up"></i></span>5.25%</p>
                <p className='w3-medium margin-0'>Daily: <span style={{margin: '1px'}} className='w3-tag w3-white w3-round-large w3-border w3-border-teal'>{formatNumber(props.daily * props.rate)}</span></p>
                <p className='w3-medium margin-0'>Days: <span style={{margin: '1px'}}  className='w3-tag w3-white w3-round-large w3-border w3-border-red'>{props.days}</span></p>
                <button onClick={sendRequest} style={{width: '100%', marginTop: '10px', marginBottom: '10px'}} className='w3-btn secondary w3-round-large w3-text-white'>Buy</button>
            </div>
        </div>
    </div>
  )
}

export default Package2