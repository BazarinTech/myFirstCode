import React from 'react'

const Item2 = (props) => {
  let total = props.total
  let rate = props.rate
  let currency = props.currency
  let status = props.status
  let stats = true
  function formatNumber(number) {
    return number.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}
  return (
    <div className='w3-panel w3-white w3-round flex-row w3-card'>
        <div className='w3-row'>
            <img src={props.image} width={100} />
        </div>
        <div className='w3-row padding-sm'>
                <p className='w3-large margin-0 bold'>{props.name}</p>
                <p className='w3-large margin-0 bold primary'>{formatNumber(props.cost * rate)}</p>
                <p className='w3-text-green bold w3-medium margin-0'><span className='w3-large margin-0'><i class="fa-solid fa-caret-up"></i></span>5.25%</p>
                <p className='w3-medium margin-0'>Daily: <span className='w3-tag w3-white w3-border w3-border-teal w3-round-large'>{formatNumber(props.daily * rate)}</span></p>
                <p className='w3-medium margin-0'>Remaining grabbing days: {props.days}</p>
                <p className='w3-medium margin-0'>Status: <span className={`w3-tag w3-${props.status == 'Active' ? 'green' : 'red'} w3-round-large`}>{props.status}</span></p>
        </div>
    </div>
  )
}

export default Item2