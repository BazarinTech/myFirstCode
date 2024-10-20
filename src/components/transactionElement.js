import React from 'react'

const TransactionElem = (props) => {
    const rate = props.rate
    function formatNumber(number) {
        return number.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
    }
  return (
    <div className='w3-panel w3-white flex-row j-space w3-card w3-round-large'>
        <div className='w3-left'>
            <p className={`${(props.deposit) ? "w3-text-green": (props.recieve) ? "w3-text-green" : "w3-text-red"} bold w3-text-grey`}>
                {props.name}
            </p>
            <p className={`w3-small ${(props.status === 'Success' || props.status === 'Approved') ? "w3-text-green" : "w3-text-red"}`}>
                {props.status}
            </p>
        </div>
        <p className='primary bold w3-center w3-large'>
            {props.date}
        </p>
        <div className='w3-right flex-row'>
            <p className={`${(props.name == "Deposits") ? "w3-text-green": (props.name == "Recieve") ? "w3-text-green" : "w3-text-red"} bold w3-large`}>
            {(props.name == 'Deposits') ? "+": (props.recieve) ? "+" : "-"}{props.currency} {formatNumber(props.amount * rate)}
            </p>
        </div>
    </div>
  )
}

export default TransactionElem