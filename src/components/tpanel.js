import React from 'react'

const TeamPanel = (props) => {
  function formatNumber(number) {
    return number.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
}
  return (
    <div className='w3-panel w3-round prodt'>
    <div className='w3-row  flex-row'>
      <p className='w3-large w3-padding bold margin-0'>
        Team-{props.level}
      </p>
      <p className='w3-text-blue bold w3-padding margin-0'>
        <span><i class="fa-solid fa-gift"></i></span>
        <span>{(props.status) ? " Active": " Inactive"}</span>
      </p>
    </div>
    <div style={{marginTop: '20px'}} className='w3-row flex-row'>
      <div className='w3-third grid-center'>
          <p className='margin-0 w3-text-lightgrey'>
            Totals
          </p>
          <p className='margin-0 bold'>
            {props.members}
          </p>
      </div>
      <div className='w3-third grid-center'>
          <p className='margin-0 w3-text-lightgrey'>
            Total Commission
          </p>
          <p className='margin-0 bold'>
          {props.currency } {formatNumber(props.com * props.rate)}
          </p>
      </div>
      <div className='w3-third grid-center'>
          <p className='margin-0 w3-text-lightgrey'>
            Actives
          </p>
          <p className='margin-0 bold'>
            {props.active}
          </p>
      </div>
    </div>
  </div>
  )
}

export default TeamPanel