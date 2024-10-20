import React from 'react'
import not_found from '../images/icons/not_found.gif'

const None = (props) => {
  return (
    <div className='w3-row grid-center'>
        <div className='w3-row'>
            <img src={not_found} width={200} />
        </div>
        <div className='w3-row'>
            <p className='w3-large'>{props.name}</p>
        </div>
    </div>
  )
}

export default None