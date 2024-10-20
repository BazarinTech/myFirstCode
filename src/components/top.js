import React from 'react'
import { Link } from 'react-router-dom'

const Top = (props) => {
  return (
    <div className='w3-container top1'>
    <div className='w3-panel flex-row'>
      <Link to='/profile' className='w3-xlarge a margin-0'>
      <i class="fa-solid fa-rotate-left"></i>
      </Link>
      <p className='w3-xlarge w3-padding'>
        {props.name}
      </p>
    </div>
  </div>
  )
}

export default Top